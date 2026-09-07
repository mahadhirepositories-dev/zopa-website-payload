import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { loadAuthorizedCart } from '@/utilities/cartAccess'

export async function POST(req: Request) {
  try {
    const { action, cartId, itemId, secret } = await req.json()

    if (!cartId || !itemId || !action) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const payload = await getPayload({ config })

    const { cart, error } = await loadAuthorizedCart({
      payload,
      headers: req.headers,
      cartId,
      clientSecret: secret,
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: error.status })
    }

    const items = [...(cart.items || [])]
    const itemIndex = items.findIndex((item: any) => item.id === itemId)

    if (itemIndex === -1) {
      return NextResponse.json({ error: 'Item not found in cart' }, { status: 404 })
    }

    if (action === 'remove') {
      items.splice(itemIndex, 1)
    } else if (action === 'increment') {
      items[itemIndex] = {
        ...items[itemIndex],
        quantity: (items[itemIndex].quantity || 1) + 1,
      }
    } else if (action === 'decrement') {
      const newQty = (items[itemIndex].quantity || 1) - 1
      if (newQty <= 0) items.splice(itemIndex, 1)
      else items[itemIndex] = { ...items[itemIndex], quantity: newQty }
    } else {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }

    const updatedCart = await payload.update({
      id: cartId,
      collection: 'carts',
      data: { items, currency: 'INR' },
      depth: 2,
      overrideAccess: true,
    })

    return NextResponse.json({ success: true, cart: updatedCart })
  } catch (error) {
    console.error('Cart action failed:', error)
    return NextResponse.json({ error: 'Cart action failed' }, { status: 500 })
  }
}