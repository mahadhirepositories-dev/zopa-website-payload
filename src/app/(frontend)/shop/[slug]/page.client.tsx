'use client'

import React, { useState } from 'react'
import { useCart } from '@payloadcms/plugin-ecommerce/client/react'
import Link from 'next/link'
import type { Product } from '@/payload-types'

type Props = {
  product: Product
}

export default function ProductDetailClient({ product }: Props) {
  const { addItem, isLoading } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState<'description' | 'reviews'>(
    'description',
  )
  const [selectedImage, setSelectedImage] = useState(0)

  const images = (product.images || []).filter(
    (img): img is NonNullable<typeof img> =>
      typeof img.image === 'object' && img.image !== null,
  )

  const price = product.priceInUSD ?? 0
  const formattedPrice = `₹${(price / 100).toLocaleString('en-IN', {
    minimumFractionDigits: 2,
  })}`

  const handleAddToCart = async () => {
    await addItem({ product: product.id }, quantity)
  }

  return (
    <section className="container py-16">
      {/* Title Bar */}
      <div className="bg-muted py-4 px-6 mb-8">
        <h1 className="text-2xl font-bold">Product: {product.title}</h1>
      </div>

      {/* Breadcrumb */}
      <nav className="text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/shop" className="hover:underline">
          Shop
        </Link>
        <span className="mx-2">/</span>
        <span>{product.title}</span>
      </nav>

      {/* Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Left: Images */}
        <div>
          <div className="border rounded-lg overflow-hidden aspect-square mb-4">
            {images[selectedImage]?.image &&
              typeof images[selectedImage].image === 'object' && (
                <img
                  src={images[selectedImage].image.url!}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              )}
          </div>

          {images.length > 1 && (
            <div className="flex gap-3">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 border-2 rounded overflow-hidden ${
                    selectedImage === index
                      ? 'border-primary'
                      : 'border-border'
                  }`}
                >
                  {typeof img.image === 'object' && img.image !== null && (
                    <img
                      src={img.image.url!}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Info */}
        <div>
          <h2 className="text-3xl font-bold mb-4">{product.title}</h2>

          {/* Why Register bullets */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Why Register?</h3>
            <ul className="space-y-1 text-muted-foreground">
              <li>• Show up for buyers</li>
              <li>• Receive category/location leads</li>
              <li>• Submit accurate quotes</li>
              <li>• Reach buyers outside your network</li>
            </ul>
          </div>

          {/* How it Works */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">How it Works:</h3>
            <ol className="space-y-1 text-muted-foreground">
              <li>① Purchase registration product</li>
              <li>② Receive PDF + secure link</li>
              <li>③ Complete registration</li>
              <li>④ Profile goes live within 48 hrs</li>
            </ol>
          </div>

          {/* Price */}
          <p className="text-3xl font-bold mb-6">{formattedPrice}</p>

          {/* Quantity + Add to Cart */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border rounded">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 text-lg"
              >
                −
              </button>
              <span className="px-4 py-2 text-lg">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 text-lg"
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={isLoading}
              className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 disabled:opacity-50"
            >
              {isLoading ? 'Adding...' : 'Add to cart'}
            </button>
          </div>

          {/* Category */}
          {product.categories && (
            <p className="text-sm text-muted-foreground">
              Category:{' '}
              {product.categories?.[0] &&
  typeof product.categories[0] === 'object' && (
    <p className="text-sm text-muted-foreground">
      Category: {product.categories[0].title}
    </p>
  )}
            </p>
          )}
        </div>
      </div>

      {/* Tabs: Description / Reviews */}
      <div className="border-t pt-8">
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('description')}
            className={`px-4 py-2 font-semibold border-b-2 ${
              activeTab === 'description'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground'
            }`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-4 py-2 font-semibold border-b-2 ${
              activeTab === 'reviews'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground'
            }`}
          >
            Reviews (0)
          </button>
        </div>

        {activeTab === 'description' && (
          <div className="prose max-w-none">
            <p>{product.description}</p>
          </div>
        )}

        {activeTab === 'reviews' && (
          <p className="text-muted-foreground">No reviews yet.</p>
        )}
      </div>
    </section>
  )
}