import Link from 'next/link'

export default function OrderConfirmationPage() {
  return (
    <section className="container py-28 text-center">
      <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
      <p className="text-muted-foreground mb-8">
        Thank you for your purchase. Your order has been placed successfully.
      </p>
      <Link
        href="/"
        className="inline-block rounded-lg bg-[#D4A843] px-6 py-3 font-semibold text-white hover:opacity-90"
      >
        Continue Shopping
      </Link>
    </section>
  )
}