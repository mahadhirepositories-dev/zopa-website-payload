import { NextResponse } from 'next/server'
import Razorpay from 'razorpay'
import { getPayload } from 'payload'
import config from '@payload-config'

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export async function POST(req: Request) {
  try {
    const { cartId } = await req.json()
    if (!cartId) {
      return NextResponse.json({ error: 'Missing cartId' }, { status: 400 })
    }

    const payload = await getPayload({ config })

    const localReq: any = {
      ...payload,
      context: { cartSecret: req.headers.get('x-cart-secret') || undefined },
      user: undefined,
    }

    const cart = await payload.findByID({
      id: cartId,
      collection: 'carts',
      depth: 2,
      overrideAccess: false,
      req: localReq,
    })

    if (!cart) {
      return NextResponse.json({ error: 'Cart not found' }, { status: 404 })
    }

    // ── Recompute amount server-side from the real cart ──
    let amount = 0
    for (const item of cart.items ?? []) {
      if (!item.product) continue
      const productId = typeof item.product === 'object' ? item.product.id : item.product
      const product = await payload.findByID({
        id: productId,
        collection: 'products',
        depth: 0,
        overrideAccess: true,
      })
      amount += (product.priceInINR ?? 0) * (item.quantity ?? 1)
    }

    if (amount <= 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
    }

    const order = await razorpay.orders.create({
      amount, // server-computed paise
      currency: 'INR',
      receipt: 'cart_' + cart.id,
    })

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    })
  } catch (error) {
    console.error('Razorpay order creation failed:', error)
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}