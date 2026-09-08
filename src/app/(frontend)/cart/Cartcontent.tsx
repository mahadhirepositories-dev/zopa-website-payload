'use client'

import React, { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { useCart } from '@payloadcms/plugin-ecommerce/client/react'
import { Trash2 } from 'lucide-react'

type CartItem = {
  id: string
  quantity?: number
  product?: {
    id: number
    title?: string
    slug?: string
    subtitle?: string
    description?: string
    priceInINR?: number
    image?: { url?: string } | number | null
  } | null
}

const inr = (cents: number) =>
  `₹${(cents / 100).toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`

export default function CartContent() {
  const { isLoading } = useCart()

  const [cart, setCart] = useState<{
    id: string
    items: CartItem[]
    secret?: string
  } | null>(null)
  const [pending, setPending] = useState(true)
  const [couponCode, setCouponCode] = useState('')
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  const fetchCart = useCallback(async () => {
    const id = localStorage.getItem('cart')
    const secret = localStorage.getItem('cart_secret')

    if (!id) {
      setCart(null)
      setPending(false)
      return
    }

    try {
      const res = await fetch(
        `/api/carts/${id}?depth=2${secret ? `&secret=${secret}` : ''}`,
        { credentials: 'include' },
      )
      if (!res.ok) throw new Error(String(res.status))
      const data = await res.json()
      setCart({ ...data, secret: secret || undefined })
    } catch {
      setCart(null)
    } finally {
      setPending(false)
    }
  }, [])

  useEffect(() => {
    void fetchCart()
  }, [fetchCart])

  // Use our custom /api/cart-actions endpoint (Local API, not broken plugin REST)
  const callAction = useCallback(
    async (action: 'increment' | 'decrement' | 'remove', itemId: string) => {
      if (!cart?.id) return

      const res = await fetch('/api/cart-actions', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action,
          cartId: cart.id,
          itemId,
          ...(cart.secret ? { secret: cart.secret } : {}),
        }),
      })

      if (!res.ok) throw new Error(`Cart action failed: ${res.status}`)
      return res.json()
    },
    [cart],
  )

  const handleUpdate = useCallback(
    async (itemId: string, action: 'increment' | 'decrement') => {
      setUpdatingId(itemId)
      try {
        await callAction(action, itemId)
        await fetchCart()
      } catch (err) {
        console.error('Cart update failed:', err)
        alert('Failed to update cart. Please try again.')
      } finally {
        setUpdatingId(null)
      }
    },
    [callAction, fetchCart],
  )

  const handleRemove = useCallback(
    async (itemId: string) => {
      setUpdatingId(itemId)
      try {
        await callAction('remove', itemId)
        await fetchCart()
      } catch (err) {
        console.error('Cart remove failed:', err)
        alert('Failed to remove item. Please try again.')
      } finally {
        setUpdatingId(null)
      }
    },
    [callAction, fetchCart],
  )

  const items = cart?.items ?? []
  const subtotal = items.reduce(
    (sum, item) =>
      sum + (item.product?.priceInINR ?? 0) * (item.quantity ?? 1),
    0,
  )

  if (isLoading || pending) {
    return (
      <section className="container py-16">
        <p className="text-muted-foreground">Loading cart...</p>
      </section>
    )
  }

  return (
    <section className="container py-16">
      <h1 className="text-3xl font-bold mb-10">Cart</h1>

      {items.length === 0 ? (
        <p className="text-muted-foreground">
          Your cart is empty.{' '}
          <Link href="/" className="underline">
            Continue shopping
          </Link>
        </p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12">
          <div>
            <div className="hidden sm:grid grid-cols-[1fr_140px] pb-3 border-b border-border">
              <span className="text-sm font-bold tracking-wide uppercase">
                Product
              </span>
              <span className="text-sm font-bold tracking-wide uppercase text-right">
                Total
              </span>
            </div>

            {items.map((item) => {
              const p = item.product
              const image =
                p?.image && typeof p.image === 'object' ? p.image : null
              const qty = item.quantity ?? 1
              const busy = updatingId === item.id

              return (
                <div key={item.id} className="py-6 border-b border-border">
                  <div className="grid grid-cols-[96px_1fr] sm:grid-cols-[96px_1fr_140px] gap-4">
                    <div className="h-24 w-24 overflow-hidden rounded border bg-muted">
                      {image?.url && (
                        <img
                          src={image.url}
                          alt={p?.title ?? ''}
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>

                    <div className="min-w-0">
                      <Link
                        href={`/shop/${p?.slug ?? ''}`}
                        className="font-semibold text-lg hover:underline"
                      >
                        {p?.title ?? 'Product'}
                      </Link>
                      <p className="font-semibold mt-1">
                        {inr(p?.priceInINR ?? 0)}
                      </p>
                      {(p?.subtitle || p?.description) && (
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {p?.subtitle ?? p?.description}
                        </p>
                      )}
                    </div>

                    <p className="hidden sm:block text-right font-semibold">
                      {inr((p?.priceInINR ?? 0) * qty)}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center gap-4 sm:pl-[112px]">
                    <div className="flex items-center border rounded overflow-hidden">
                      <span className="px-4 py-1.5 text-center min-w-[40px]">{busy ? '…' : qty}</span>
                      <div className="flex flex-col border-l">
                        <button
                          onClick={() => handleUpdate(item.id, 'increment')}
                          disabled={busy}
                          className="px-2 py-0.5 text-xs leading-none border-b hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                          aria-label="Increase quantity"
                        >
                         ▲
                        </button>
                        <button
                        onClick={() => handleUpdate(item.id, 'decrement')}
                        disabled={busy || qty <= 1}
                        className="px-2 py-0.5 text-xs leading-none hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Decrease quantity"
                        >
                        ▼
                       </button>
                      </div>
                    </div>

                    <button
                      onClick={() => handleRemove(item.id)}
                      disabled={busy}
                      className="text-muted-foreground hover:text-red-600 disabled:opacity-50"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          <aside className="h-fit border rounded-lg p-6 lg:sticky lg:top-24">
            <h2 className="text-sm font-bold tracking-wide uppercase mb-6">
              Cart Totals
            </h2>

            <div className="mb-6">
              <details className="group">
                <summary className="cursor-pointer select-none text-muted-foreground hover:text-foreground flex justify-between items-center">
                  <span>Add coupons</span>
                  <span className="transition-transform group-open:rotate-180">
                    ▾
                  </span>
                </summary>
                <div className="mt-3 flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Coupon code"
                    className="border rounded px-3 py-2 text-sm flex-1"
                  />
                  <button className="bg-primary text-primary-foreground rounded px-4 py-2 text-sm font-medium">
                    Apply
                  </button>
                </div>
              </details>
            </div>

            <div className="flex justify-between py-3 border-b border-border">
              <span className="text-muted-foreground">Estimated total</span>
              <span className="font-bold text-lg">{inr(subtotal)}</span>
            </div>

            <Link
              href="/checkout"
              className="mt-6 block w-full rounded-lg bg-[#D4A843] py-3 text-center font-semibold text-white hover:opacity-90"
            >
              Proceed to Checkout
            </Link>
          </aside>
        </div>
      )}
    </section>
  )
}