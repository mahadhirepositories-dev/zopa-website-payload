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
    priceInUSD?: number
    image?: { url?: string } | number | null
  } | null
}

const inr = (cents: number) =>
  `₹${(cents / 100).toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`

export default function CartContent() {
  const { isLoading, incrementItem, decrementItem, removeItem, clearCart } =
    useCart()

  const [cart, setCart] = useState<{ items: CartItem[] } | null>(null)
  const [pending, setPending] = useState(true)
  const [couponCode, setCouponCode] = useState('')

  const reload = useCallback(async () => {
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
      setCart(await res.json())
    } catch {
      setCart(null)
    } finally {
      setPending(false)
    }
  }, [])

  useEffect(() => {
    void reload()
  }, [reload])

  const wrapped =
    (fn: (id: string) => Promise<void>) => (itemID: string) =>
      fn(itemID).finally(() => void reload())

  const onIncrement = wrapped(incrementItem)
  const onDecrement = wrapped(decrementItem)
  const onRemove = wrapped(removeItem)

  const items = cart?.items ?? []
  const subtotal = items.reduce(
    (sum, item) =>
      sum + (item.product?.priceInUSD ?? 0) * (item.quantity ?? 1),
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
      {/* Breadcrumb */}
      <h1 className="text-3xl font-bold mb-10">Cart</h1>

      {items.length === 0 ? (
        <p className="text-muted-foreground">
          Your cart is empty.{' '}
          <Link href="/shop" className="underline">
            Continue shopping
          </Link>
        </p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12">
          {/* ── Left: Products ── */}
          <div>
            {/* Table head */}
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

              return (
                <div
                  key={item.id}
                  className="py-6 border-b border-border"
                >
                  {/* Image | info | line total */}
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
                        {inr(p?.priceInUSD ?? 0)}
                      </p>
                      {(p?.subtitle || p?.description) && (
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {p?.subtitle ?? p?.description}
                        </p>
                      )}
                    </div>

                    <p className="hidden sm:block text-right font-semibold">
                      {inr((p?.priceInUSD ?? 0) * qty)}
                    </p>
                  </div>

                  {/* Qty + Remove row */}
                  <div className="mt-4 flex items-center gap-4 sm:pl-[112px]">
                    <div className="flex items-center border rounded">
                      <button
                        onClick={() => onDecrement(item.id)}
                        className="px-3 py-1.5"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="px-4">{qty}</span>
                      <button
                        onClick={() => onIncrement(item.id)}
                        className="px-3 py-1.5"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => onRemove(item.id)}
                      className="text-muted-foreground hover:text-red-600"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          {/* ── Right: Cart totals ── */}
          <aside className="h-fit border rounded-lg p-6 lg:sticky lg:top-24">
            <h2 className="text-sm font-bold tracking-wide uppercase mb-6">
              Cart Totals
            </h2>

            {/* Add coupons */}
            <div className="mb-6">
              <details className="group">
                <summary className="cursor-pointer select-none text-muted-foreground hover:text-foreground flex justify-between items-center">
                  <span>Add coupons</span>
                  <span className="transition-transform group-open:rotate-180">▾</span>
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