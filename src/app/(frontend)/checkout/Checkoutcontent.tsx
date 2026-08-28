'use client'


import React, { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { useCart } from '@payloadcms/plugin-ecommerce/client/react'
import { Country, State } from 'country-state-city'

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



export default function CheckoutContent() {
  const { isLoading } = useCart()

  const [cart, setCart] = useState<{ items: CartItem[] } | null>(null)
  const [pending, setPending] = useState(true)
  const [couponCode, setCouponCode] = useState('')
  const [addNote, setAddNote] = useState(false)
  const [orderNote, setOrderNote] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('IN') // India default
  const [selectedState, setSelectedState] = useState('TG') // Telangana default

  const [form, setForm] = useState({
  email: '',
  firstName: '',
  lastName: '',
  address: '',
  apartment: '',
  city: '',
  country: 'IN',
  state: 'TG',
  pinCode: '',
  phone: '',
})

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

  const items = cart?.items ?? []
  const subtotal = items.reduce(
    (sum, item) =>
      sum + (item.product?.priceInINR ?? 0) * (item.quantity ?? 1),
    0,
  )

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  const cartId = localStorage.getItem('cart')
  if (!cartId) {
    alert('Cart not found')
    return
  }

  try {
    const res = await fetch('/api/create-order', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    ...(localStorage.getItem('cart_secret') ? { 'x-cart-secret': localStorage.getItem('cart_secret')! } : {}),
  },
  body: JSON.stringify({ cartId }),   // removed `amount` — server recomputes
})

    if (!res.ok) throw new Error('Failed to create order')
    const { orderId, amount, currency, keyId } = await res.json()

    const options = {
      key: keyId,
      amount,
      currency,
      name: 'Zopa',
      description: 'Order Payment',
      order_id: orderId,
      handler: async (response: any) => {
  if (!response.razorpay_signature) {
    alert('Payment incomplete. Please try again.')
    return
  }

  try {
    const verifyRes = await fetch('/api/verify-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(localStorage.getItem('cart_secret')
          ? { 'x-cart-secret': localStorage.getItem('cart_secret')! }
          : {}),
      },
      body: JSON.stringify({
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,
        cartId,
        customerEmail: form.email,
        billingAddress: {
          firstName: form.firstName,
          lastName: form.lastName,
          addressLine1: form.address,
          addressLine2: form.apartment,
          city: form.city,
          state: form.state,
          postalCode: form.pinCode,
          country: form.country,
          phone: form.phone,
        },
      }),
    })

    const data = await verifyRes.json()

    if (verifyRes.ok && data.verified) {
      localStorage.removeItem('cart')
      localStorage.removeItem('cart_secret')
      window.location.href = '/order-confirmation'
    } else {
      alert(data.error || 'Payment verification failed. Contact support.')
    }
  } catch (err) {
    console.error('Verify error:', err)
    alert('Something went wrong during verification. Contact support.')
  }
},
      prefill: {
        name: `${form.firstName} ${form.lastName}`,
        email: form.email,
        contact: form.phone,
      },
      notes: {
        address: form.address,
        city: form.city,
        state: form.state,
        pincode: form.pinCode,
      },
      theme: { color: '#D4A843' },
      modal: {
        ondismiss: () => alert('Payment cancelled'),
      },
    }

    const razorpay = new window.Razorpay(options)
    razorpay.open()
  } catch (error) {
    console.error('Payment error:', error)
    alert('Something went wrong. Please try again.')
  }
}

  if (isLoading || pending) {
    return (
      <section className="container py-16">
        <p className="text-muted-foreground">Loading checkout...</p>
      </section>
    )
  }

  if (items.length === 0) {
    return (
      <section className="container py-16">
        <p className="text-muted-foreground">
          Your cart is empty.{' '}
          <Link href="/" className="underline">Continue shopping</Link>
        </p>
      </section>
    )
  }

  return (
    <section className="container py-16">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12"
      >
        {/* ── Left: Forms ── */}
        <div className="space-y-10">
          {/* Contact information */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Contact information</h2>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email address"
              required
              className="w-full border border-black rounded-sm px-4 py-3"
            />
            <p className="text-sm text-muted-foreground mt-2">
              You are currently checking out as a guest.
            </p>
          </div>

          {/* Billing address */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Billing address</h2>

            {/* Country */}
            <select
              name="country"
              value={selectedCountry}
              onChange={(e) => {
              setSelectedCountry(e.target.value)
              setSelectedState('')
              handleChange(e)
             }}
            className="w-full border border-black rounded-sm px-4 py-3 mb-4"
             >
              {Country.getAllCountries().map((c) => (
              <option key={c.isoCode} value={c.isoCode}>{c.name}</option>
              ))}
            </select>

            {/* First / Last name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="First name"
                required
                className="border border-black rounded-sm px-4 py-3"
              />
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Last name"
                required
                className="border rounded-sm border-black px-4 py-3"
              />
            </div>

            {/* Address */}
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Address"
              required
              className="w-full border border-black rounded-sm px-4 py-3 mb-2"
            />
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('apartment-field')
                if (el) el.classList.toggle('hidden')
              }}
              className="text-sm text-muted-foreground hover:underline mb-4"
            >
              + Add apartment, suite, etc.
            </button>
            <div id="apartment-field" className="hidden mb-4">
              <input
                type="text"
                name="apartment"
                value={form.apartment}
                onChange={handleChange}
                placeholder="Apartment, suite, etc. (optional)"
                className="w-full border border-black rounded-sm px-4 py-3"
              />
            </div>

            {/* City / State */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="City"
                required
                className="border border-black rounded-sm px-4 py-3"
              />
              <select
                name="state"
                value={selectedState}
                onChange={(e) => {
                setSelectedState(e.target.value)
                handleChange(e)
                }}
                required
                className="border border-black rounded-sm px-4 py-3"
              >
                  {State.getStatesOfCountry(selectedCountry).map((s) => (
                  <option key={s.isoCode} value={s.isoCode}>{s.name}</option>
                  ))}
              </select>
            </div>

            {/* PIN / Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="pinCode"
                value={form.pinCode}
                onChange={handleChange}
                placeholder="PIN Code"
                required
                className="border border-black rounded-sm px-4 py-3"
              />
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone (optional)"
                className="border border-black rounded-sm px-4 py-3"
              />
            </div>
          </div>

          {/* Payment options */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Payment options</h2>
            <label className="border border-black rounded-sm p-4 flex items-start gap-3 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="stripe"
                defaultChecked
                className="mt-1"
              />
              <div>
                <p className="font-medium">Pay by Razorpay</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Pay securely by Credit or Debit card or Internet Banking through Razorpay.
                </p>
              </div>
            </label>
          </div>

          {/* Order note */}
          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={addNote}
                onChange={(e) => setAddNote(e.target.checked)}
                className="rounded"
              />
              <span>Add a note to your order</span>
            </label>
            {addNote && (
              <textarea
                value={orderNote}
                onChange={(e) => setOrderNote(e.target.value)}
                placeholder="Write your note here..."
                rows={3}
                className="mt-3 w-full border border-black rounded-sm px-4 py-3"
              />
            )}
          </div>

          <hr className="border-border" />

          {/* Terms */}
          <p className="text-sm text-muted-foreground">
            By proceeding with your purchase you agree to our{' '}
            <Link href="/terms" className="underline">Terms and Conditions</Link>{' '}
            and{' '}
            <Link href="/privacy" className="underline">Privacy Policy</Link>
          </p>

          {/* Place Order */}
          <button
            type="submit"
            className="w-full rounded-sm bg-[#d8ad23] py-4 text-center font-semibold text-gray-900 hover:text-white"
          >
            Place Order
          </button>
        </div>

        {/* ── Right: Order summary ── */}
        <aside className="h-fit border rounded-lg p-6 lg:sticky lg:top-24">
          <h2 className="text-lg font-semibold mb-6">Order summary</h2>

          {items.map((item) => {
            const p = item.product
            const image =
              p?.image && typeof p.image === 'object' ? p.image : null
            const qty = item.quantity ?? 1

            return (
              <div key={item.id} className="flex gap-4 py-4 border-b border-border">
                <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded border bg-muted">
                  {image?.url && (
                    <img
                      src={image.url}
                      alt={p?.title ?? ''}
                      className="h-full w-full object-cover"
                    />
                  )}
                  <span className="absolute -top-1 -left-1 bg-muted text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border">
                    {qty}
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-medium text-sm">{p?.title ?? 'Product'}</p>
                  <p className="text-sm font-semibold mt-0.5">
                    {inr(p?.priceInINR ?? 0)}
                  </p>
                  {(p?.subtitle || p?.description) && (
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {p?.subtitle ?? p?.description}
                    </p>
                  )}
                </div>

                <p className="font-semibold text-sm whitespace-nowrap">
                  {inr((p?.priceInINR ?? 0) * qty)}
                </p>
              </div>
            )
          })}

          {/* Add coupons */}
          <div className="py-4 border-b border-border">
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
                <button
                  type="button"
                  className="bg-primary text-primary-foreground rounded px-4 py-2 text-sm font-medium"
                >
                  Apply
                </button>
              </div>
            </details>
          </div>

          {/* Subtotal */}
          <div className="flex justify-between py-3 border-b border-border">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-semibold">{inr(subtotal)}</span>
          </div>

          {/* Total */}
          <div className="flex justify-between py-4">
            <span className="text-lg font-bold">Total</span>
            <span className="text-lg font-bold">{inr(subtotal)}</span>
          </div>
        </aside>
      </form>
    </section>
  )
}