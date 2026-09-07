import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { after } from 'next/server'
import { getPayload, type Payload } from 'payload'
import config from '@payload-config'
import { sendOrderEmail } from '@/utilities/sendOrderEmail'
import { loadAuthorizedCart } from '@/utilities/cartAccess'

type OrderDraft = {
  items: any[]
  customerEmail?: string
  amount: number
}

async function computeAmount(payload: Payload, items: any[]): Promise<number> {
  let amount = 0
  for (const item of items ?? []) {
    const productId = typeof item.product === 'object' ? item.product.id : item.product
    if (!productId) continue
    const product = await payload.findByID({
      id: productId,
      collection: 'products',
      depth: 0,
      overrideAccess: true,
    })
    amount += (product?.priceInINR ?? 0) * (item.quantity ?? 1)
  }
  return amount
}

async function createOrder(payload: Payload, txnId: any, data: OrderDraft): Promise<any> {
  const order = await payload.create({
    collection: 'orders',
    data: {
      items: data.items,
      customerEmail: data.customerEmail,
      transactions: [txnId],
      status: 'processing',
      amount: data.amount,
      currency: 'INR',
    },
    overrideAccess: true,
  })

  // Back-link so the transaction is never an orphan (best-effort)
  await payload
    .update({
      id: txnId,
      collection: 'transactions',
      data: { order: order.id },
      overrideAccess: true,
    })
    .catch((e) => console.error('transaction→order link failed (attempted):', e))

  return order.id
}

export async function POST(req: Request) {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, cartId, customerEmail, billingAddress } =
    await req.json()

  // ── 1. Verify signature — the ONLY gate that should fail the request ──
  const body = razorpay_order_id + '|' + razorpay_payment_id
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
    .update(body)
    .digest('hex')

  if (expectedSignature !== razorpay_signature) {
    return NextResponse.json({ verified: false, error: 'Invalid signature' }, { status: 400 })
  }

  const secret = req.headers.get('x-cart-secret') || undefined
  const payload = await getPayload({ config })

  let cart: any = null
  if (cartId) {
    const authorized = await loadAuthorizedCart({
      payload,
      headers: req.headers,
      cartId,
      clientSecret: secret,
    })
    if (authorized.error) {
      return NextResponse.json({ verified: false, error: 'Cart access denied' }, { status: 403 })
    }
    cart = authorized.cart
  }

  const items = cart?.items ?? []
  let transactionID: any
  let orderID: any

  // ── 2. Idempotency — one Razorpay payment = one transaction ──
  const existingRes = await payload.find({
    collection: 'transactions',
    where: { 'razorpay.razorpayPaymentID': { equals: razorpay_payment_id } },
    depth: 1,
    limit: 1,
    overrideAccess: true,
  })
  const existingTxn = existingRes.docs?.[0]

  if (existingTxn) {
    transactionID = existingTxn.id
    const linkedOrder =
      typeof existingTxn.order === 'object' ? existingTxn.order?.id : existingTxn.order

    if (linkedOrder) {
      return NextResponse.json({ verified: true, transactionID, orderID: linkedOrder, replayed: true })
    }

    // Self-heal: payment was recorded earlier but its order was never created.
    try {
      orderID = await createOrder(payload, existingTxn.id, {
        items,
        customerEmail,
        amount: await computeAmount(payload, items),
      })
    } catch (e) {
      console.error(`RECONCILE: self-heal order creation failed for payment ${razorpay_payment_id}:`, e)
    }

    if (cart && orderID) {
      await payload
        .update({
          id: cart.id,
          collection: 'carts',
          data: { status: 'purchased', items: [], purchasedAt: new Date().toISOString(), subtotal: 0, currency: 'INR' },
          overrideAccess: true,
        })
        .catch((e) => console.error('cart update failed (ignored):', e))
    }
    if (orderID) {
      after(async () => {
        try {
          await sendOrderEmail(payload, { id: orderID, customerEmail }, items)
        } catch (e) {
          console.error(`RECONCILE: order ${orderID} email FAILED:`, e)
        }
      })
    }
    return NextResponse.json({ verified: true, transactionID, orderID, replayed: true })
  }

  // ── 3. Persist-or-queue — transaction first (durable proof of payment) ──
  try {
    const amount = await computeAmount(payload, items)

    const txn = await payload.create({
      collection: 'transactions',
      data: {
        items,
        paymentMethod: 'razorpay',
        status: 'succeeded',
        customerEmail,
        billingAddress,
        amount,
        currency: 'INR',
        razorpay: {
          razorpayOrderID: razorpay_order_id,
          razorpayPaymentID: razorpay_payment_id,
        },
        ...(cart ? { cart: cart.id } : {}),
      },
      overrideAccess: true,
    })
    transactionID = txn.id

    orderID = await createOrder(payload, txn.id, { items, customerEmail, amount })
  } catch (e) {
    // Signature verified + money left the customer's account, but nothing durable persisted.
    // Answer success anyway (never tell a paid customer their payment failed) and flag loudly.
    console.error(`RECONCILE: payment ${razorpay_payment_id} (order ${razorpay_order_id}) NOT persisted:`, e)
  }

  // ── 4. Cart update — only when an order actually exists ──
  if (cart && orderID) {
    try {
      await payload.update({
        id: cart.id,
        collection: 'carts',
        data: { status: 'purchased', items: [], purchasedAt: new Date().toISOString(), subtotal: 0, currency: 'INR' },
        overrideAccess: true,
      })
    } catch (e) {
      console.error('cart update failed (ignored):', e)
    }
  }

  // ── 5. Email — deferred but awaited by the runtime (not killed on serverless) ──
  if (orderID) {
    after(async () => {
      try {
        await sendOrderEmail(payload, { id: orderID, customerEmail }, items)
      } catch (e) {
        console.error(`RECONCILE: order ${orderID} email FAILED:`, e)
      }
    })
  }

  return NextResponse.json({ verified: true, transactionID, orderID })
}