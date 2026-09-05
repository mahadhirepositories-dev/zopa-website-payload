import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { getPayload } from 'payload'
import config from '@payload-config'
import { sendOrderEmail } from '@/utilities/sendOrderEmail'

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

  const payload = await getPayload({ config })

  const secret = req.headers.get('x-cart-secret') || ''
  const localReq: any = { ...payload, context: { cartSecret: secret }, user: undefined }

  let cart: any = null
  try {
    if (cartId) {
      cart = await payload.findByID({
        id: cartId,
        collection: 'carts',
        depth: 2,
        overrideAccess: true,
        req: localReq,
      })
    }
  } catch (e) { console.error('cart load failed (ignored):', e) }

  const items = cart?.items ?? []

  let transactionID: number | undefined
  let orderID: number | undefined

  // ── 2. Compute + persist — isolated, never blocks success ──
  try {
    let amount = 0
    for (const item of items) {
      const productId = typeof item.product === 'object' ? item.product.id : item.product
      if (!productId) continue
      const product = await payload.findByID({ id: productId, collection: 'products', depth: 0, overrideAccess: true })
      amount += (product?.priceInINR ?? 0) * (item.quantity ?? 1)
    }

    const transaction = await payload.create({
      collection: 'transactions',
      data: { items, paymentMethod: 'razorpay', status: 'succeeded', customerEmail, billingAddress, amount, currency: 'INR', ...(cart ? { cart: cart.id } : {}) },
      overrideAccess: true,
    })
    transactionID = transaction.id

    const order = await payload.create({
      collection: 'orders',
      data: { items, customerEmail, transactions: [transaction.id], status: 'processing', amount, currency: 'INR' },
      overrideAccess: true,
    })
    orderID = order.id
  } catch (e) { console.error('order/transaction persist failed (ignored):', e) }

  // ── 3. Cart update — isolated ──
  if (cart) {
    try {
      await payload.update({
        id: cart.id,
        collection: 'carts',
        data: { status: 'purchased', items: [], purchasedAt: new Date().toISOString(), subtotal: 0, currency: 'INR' },
        overrideAccess: true,
        req: localReq,
      })
    } catch (e) { console.error('cart update failed (ignored):', e) }
  }

  // ── 4. Email (with PDF) — isolated, fire-and-forget ──
  try {
    sendOrderEmail(payload, { id: orderID, customerEmail }, items).catch((e) =>
    console.error('Order email FAILED:', e),
   )
  } catch (e) { console.error('email kick-off failed (ignored):', e) }

  return NextResponse.json({ verified: true, transactionID, orderID })
}
    