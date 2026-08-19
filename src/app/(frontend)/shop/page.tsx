import type { Metadata } from 'next'
import React from 'react'
import { draftMode } from 'next/headers'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import Link from 'next/link'

export default async function ShopPage() {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const products = await payload.find({
    collection: 'products',
    draft,
    limit: 50,
    depth: 2,
  })

  return (
    <section className="container py-16">
      <h1 className="text-3xl font-bold mb-8">Shop</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.docs.map((product) => {
          const image =
            typeof product.image === 'object' && product.image !== null
              ? product.image
              : null

          return (
            <Link
              key={product.id}
              href={`/shop/${product.slug}`}
              className="group border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              {image?.url && (
                <div className="aspect-square overflow-hidden">
                  <img
                    src={image.url}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
              )}
              <div className="p-4">
                <h2 className="text-lg font-semibold">{product.title}</h2>
                {product.priceInUSD != null && (
  <p className="text-xl font-bold mt-2">
    ₹{(product.priceInUSD / 100).toLocaleString('en-IN')}
  </p>
)}
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export const metadata: Metadata = {
  title: 'Shop | Zopa',
}