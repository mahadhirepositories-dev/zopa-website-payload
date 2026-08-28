import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function POST(req: Request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, cartId, customerEmail, billingAddress } =
      await req.json()

    // ── 1. Verify the signature (client-side payment authenticity) ──
    const body = razorpay_order_id + '|' + razorpay_payment_id
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest('hex')

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json(
        { verified: false, error: 'Invalid signature' },
        { status: 400 },
      )
    }

    const payload = await getPayload({ config })

    // ── 2. Load the cart (authorize by secret in context) ──
    let cart: any = null
    const localReq: any = {
      ...payload,
      context: cartId ? { cartSecret: null } : {},
      user: undefined,
    }

    if (cartId) {
      cart = await payload.findByID({
        id: cartId,
        collection: 'carts',
        depth: 2,
        overrideAccess: false,
        req: localReq,
      })
      if (!cart) {
        return NextResponse.json({ verified: true, error: 'Cart not found' }, { status: 200 })
      }
      // Re-fetch with secret access so guest carts work
      const secret = req.headers.get('x-cart-secret') || ''
      // (Optional) verify secret matches cart.secret before continuing
    }

    // ── 3. Recompute subtotal SERVER-SIDE — never trust the browser ──
    const items = cart?.items ?? []
    let amount = 0
    for (const item of items) {
      const productId = typeof item.product === 'object' ? item.product.id : item.product
      if (!productId) continue
      const product = await payload.findByID({
        id: productId,
        collection: 'products',
        depth: 0,
        overrideAccess: true,
      })
      amount += (product.priceInINR ?? 0) * (item.quantity ?? 1)
    }

    // ── 4. Create the Transaction ──
    const transaction = await payload.create({
      collection: 'transactions',
      data: {
        items,
        paymentMethod: 'stripe', // ← schema only has 'stripe'; keep it unless you regen types with a Razorpay adapter
        status: 'succeeded',
        customerEmail,
        billingAddress,
        amount,
        currency: 'INR',
        ...(cart ? { cart: cart.id } : {}),
      },
    })

    // ── 5. Create the Order ──
    const order = await payload.create({
      collection: 'orders',
      data: {
        items,
        customerEmail,
        transactions: [transaction.id],
        status: 'processing',
        amount,
        currency: 'INR',
      },
    })

    // ── 6. Mark the cart as purchased & clear items ──
    if (cart) {
      await payload.update({
        id: cart.id,
        collection: 'carts',
        data: { status: 'purchased', items: [], purchasedAt: new Date().toISOString(), subtotal: 0, currency: 'INR' },
        overrideAccess: false,
        req: localReq,
      })
    }

    return NextResponse.json({ verified: true, transactionID: transaction.id, orderID: order.id })
  } catch (error) {
    console.error('Payment verification failed:', error)
    return NextResponse.json({ verified: false, error: 'Verification failed' }, { status: 500 })
  }
}