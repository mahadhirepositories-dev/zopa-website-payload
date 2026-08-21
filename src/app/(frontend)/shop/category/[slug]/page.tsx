import type { Metadata } from 'next'
import React from 'react'
import { draftMode } from 'next/headers'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { AddToCartButton } from '@/components/AddToCartButton'
import { SortSelect } from '@/components/SortSelect'

type Args = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ sort?: string }>
}

export default async function CategoryPage({ params, searchParams }: Args) {
  const { slug } = await params
  const { sort } = await searchParams
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  // Find the category by slug
  const categoryRes = await payload.find({
    collection: 'categories',
    draft,
    limit: 1,
    where: { slug: { equals: slug } },
  })
  const category = categoryRes.docs[0]
  if (!category) return notFound()

  // Fetch products in this category (+ optional price sorting)
  const sortBy =
    sort === 'price-asc' ? 'priceInUSD' : sort === 'price-desc' ? '-priceInUSD' : undefined

  const productsRes = await payload.find({
    collection: 'products',
    draft,
    limit: 50,
    depth: 2,
    where: { categories: { in: [category.id] } },
    ...(sortBy ? { sort: sortBy } : {}),
  })

  const count = productsRes.totalDocs

  return (
    <>
      {/* Banner */}
      <section className="py-16 px-10 bg-[#D3D3D3]">
        <div className="container mx-auto max-w-4xl">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-600">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span>{category.title}</span>
          </nav>
          <h1 className="mt-5 text-[30px] font-[420] text-black md:text-5xl font-sans">
            {category.title}
          </h1>
        </div>
      </section>

      {/* Results */}
      <section className="container py-16">
        <div className="flex items-center justify-between mb-8">
          <p className="text-muted-foreground">
            Showing the{' '}
            {count === 1 ? 'single result' : `${count} results`}
          </p>
          <SortSelect />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {productsRes.docs.map((product) => {
            const image =
              typeof product.image === 'object' && product.image !== null
                ? product.image
                : null

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
                    {product.priceInUSD != null && (
                      <p className="text-xl font-bold mt-2">
                        ₹{(product.priceInUSD / 100).toLocaleString('en-IN')}
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
  title: 'Registration | Zopa Shop',
}