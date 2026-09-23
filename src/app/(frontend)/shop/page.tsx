import type { Metadata } from 'next'
import React from 'react'
import Link from 'next/link'
import { draftMode } from 'next/headers'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { AddToCartButton } from '@/components/AddToCartButton'

export const dynamic = 'force-dynamic'

export default async function ShopPage() {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const productsRes = await payload.find({
    collection: 'products',
    draft,
    limit: 100,
    depth: 1,
  })

  const products = productsRes.docs

  return (
    <>
      <section className="py-16 px-10 bg-[#D3D3D3]">
        <div className="container mx-auto max-w-4xl">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-600">
            <Link href="/" className="hover:underline">Home</Link>
            <span className="mx-2">/</span>
            <span>Shop</span>
          </nav>
          <h1 className="mt-5 text-[30px] font-[420] text-black md:text-5xl font-sans">
            Ecommerce Products
          </h1>
        </div>
      </section>

      <section className="container py-16">
        <p className="mb-8 text-muted-foreground">Showing {products.length} result(s)</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => {
            const image =
              typeof product.image === 'object' && product.image !== null ? product.image : null
            return (
              <div
                key={product.id}
                className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
              >
                <Link href={`/shop/${product.slug}`} className="group block">
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
                    {product.priceInINR != null && (
                      <p className="text-xl font-bold mt-2">
                        ₹{(product.priceInINR / 100).toLocaleString('en-IN')}
                      </p>
                    )}
                  </div>
                </Link>
                <div className="px-4 pb-4 mt-auto">
                  <AddToCartButton productId={product.id} />
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}

export const metadata: Metadata = {
  title: 'Ecommerce Products | Zopa Shop',
}