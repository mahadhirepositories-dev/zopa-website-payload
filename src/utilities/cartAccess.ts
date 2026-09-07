import crypto from 'crypto'
import type { Payload } from 'payload'

type CartLike = {
  [key: string]: any
  secret?: string | null
  customer?: any
}

type Result =
  | { cart: CartLike; user: any | null; error?: undefined }
  | { cart?: undefined; user?: undefined; error: { status: number; message: string } }

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(String(a ?? ''))
  const bufB = Buffer.from(String(b ?? ''))
  if (bufA.length !== bufB.length) return false
  return crypto.timingSafeEqual(bufA, bufB)
}

export async function loadAuthorizedCart(args: {
  payload: Payload
  headers: Headers
  cartId: string
  clientSecret?: string | null
}): Promise<Result> {
  const { payload, headers, cartId, clientSecret } = args

  // Real authenticated user (from the auth cookie), not a fabricated req
  let user: any = null
  try {
    const { user: authed } = await payload.auth({ headers })
    user = authed
  } catch {
    user = null
  }

  let cart: CartLike | null = null
  try {
    cart = await payload.findByID({
      id: cartId,
      collection: 'carts',
      depth: 2,
      overrideAccess: true,
    })
  } catch {
    return { error: { status: 404, message: 'Cart not found' } }
  }

  if (!cart) {
    return { error: { status: 404, message: 'Cart not found' } }
  }

  // 1) Authenticated admin or the cart's owner → allowed
  if (user) {
    const customerId =
      typeof cart.customer === 'object' ? cart.customer?.id : cart.customer
    if (user.role === 'admin' || customerId === user.id) {
      return { cart, user }
    }
  }

  // 2) Guest cart: the secret is the only proof of ownership. Require it.
  if (cart.secret) {
    if (typeof clientSecret === 'string' && safeEqual(cart.secret, clientSecret)) {
      return { cart, user }
    }
    return { error: { status: 403, message: 'Cart access denied' } }
  }

  // 3) No secret, not the owner → deny instead of granting
  return { error: { status: 403, message: 'Cart access denied' } }
}