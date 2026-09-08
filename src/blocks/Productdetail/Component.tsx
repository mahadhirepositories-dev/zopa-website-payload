'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@payloadcms/plugin-ecommerce/client/react'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import type { Product, ProductDetailBlock } from '@/payload-types'
import { ProductReviews } from '@/components/ProductReviews'

function extractText(node: Record<string, any>): string {
  if (node.text) return node.text
  if (node.children) return node.children.map(extractText).join('')
  return ''
}

type Props = ProductDetailBlock & {
  product?: Product | null
  layoutBlocks?: React.ReactNode
}

export const ProductDetailBlockComponent = ({
  showBreadcrumb = true,
  showGallery = true,
  headingOverride,
  subtitleOverride,
  product,
  layoutBlocks,
}: Props) => {
  const { addItem, isLoading } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [showSuccess, setShowSuccess] = useState(false)

  if (!product) return null

  const images = (product.images || []).filter(
    (img): img is NonNullable<typeof img> =>
      typeof img.image === 'object' && img.image !== null,
  )

  const price = product.priceInINR ?? 0
  const formattedPrice = `₹${(price / 100).toLocaleString('en-IN', {
    minimumFractionDigits: 2,
  })}`

  const categoryName =
    product.categories?.[0] &&
    typeof product.categories[0] === 'object' &&
    product.categories[0]?.title
      ? product.categories[0].title
      : 'Shop'

  const categorySlug =
    product.categories?.[0] &&
    typeof product.categories[0] === 'object' &&
    product.categories[0]?.slug
      ? product.categories[0].slug
      : null

  const title = headingOverride || product.title

  const handleAddToCart = async () => {
    try {
      await addItem({ product: product.id }, quantity)
      setShowSuccess(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setTimeout(() => setShowSuccess(false), 6000)
    } catch (error) {
      console.error('Failed to add to cart:', error)
    }
  }

  return (
    <section className="container py-16">
      {/* Success / View Cart banner - always available */}
      {showSuccess && (
        <div
          role="status"
          aria-live="polite"
          className="mb-8 flex w-full flex-col gap-3 rounded-md border border-green-200 bg-green-50 px-4 py-3 sm:flex-row sm:items-center sm:gap-4"
        >
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-600 text-sm font-bold text-white">
              ✓
            </span>
            <p className="truncate text-sm text-green-900">
              <span className="font-semibold">{title}</span> has been added to
              your cart.
            </p>
          </div>
          <Link
            href="/cart"
            className="flex-shrink-0 rounded-md border border-green-600 px-4 py-1.5 text-center text-sm font-medium text-green-700 transition-colors hover:bg-green-100 sm:ml-auto"
          >
            View cart
          </Link>
        </div>
      )}

      {/* Extra marketing blocks for this product (About, Pricing, etc.) */}
      {layoutBlocks}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Left: Main Image */}
        <div>
          <div className="border rounded-lg overflow-hidden aspect-square mb-4">
            {images[selectedImage]?.image &&
              typeof images[selectedImage].image === 'object' && (
                <img
                  src={images[selectedImage].image.url!}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              )}
          </div>

          {showGallery && images.length > 1 && (
            <div className="flex gap-3">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-38 h-38 border-2 rounded overflow-hidden flex-shrink-0 ${
                    selectedImage === index ? 'border-primary' : 'border-border'
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

        {/* Right: Info */}
        <div>
          {showBreadcrumb && (
            <nav className="text-sm text-muted-foreground mb-6">
              <Link href="/" className="hover:underline">Home</Link>
              <span className="mx-2">/</span>
              <Link
                href={categorySlug ? `/shop/category/${categorySlug}` : '/'}
                className="hover:underline"
              >
                {categoryName}
              </Link>
              <span className="mx-2">/</span>
              <span>{title}</span>
            </nav>
          )}

          <h2 className="text-[40px] font-[400] mb-5">{title}</h2>

          {(subtitleOverride || product.subtitle) && (
            <p className="text-black/80 font-[700] text-[20px] mb-4">
              {subtitleOverride || product.subtitle}
            </p>
          )}

          {product.description && (
            <p className="text-black/80 text-[20px] mb-6">{product.description}</p>
          )}

          {product.whyRegister && product.whyRegister.length > 0 && (
            <div className="mb-6">
              <h3 className="text-black/80 font-[700] text-[20px] mb-3">Why Register?</h3>
              <ul className="space-y-2 text-black/80 text-[20px]">
                {product.whyRegister.map((item, index) => (
                  <li key={item.id ?? index}>• {item.text}</li>
                ))}
              </ul>
            </div>
          )}

          {product.howItWorks && product.howItWorks.length > 0 && (
            <div className="mb-6">
              <h3 className="text-black/80 font-[700] text-[20px] mb-3">How it Works:</h3>
              <ul className="space-y-2 text-black/80 text-[20px]">
                {product.howItWorks.map((item, index) => (
                  <li key={item.id ?? index}>
                     • {item.text}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {product.afterApproval && product.afterApproval.length > 0 && (
            <div className="mb-6">
              <h3 className="text-black/80 font-[700] text-[20px] mb-3">After approval:</h3>
              <ul className="space-y-2 text-black/80 text-[20px]">
                {product.afterApproval.map((item, index) => (
                  <li key={item.id ?? index}>• {item.text}</li>
                ))}
              </ul>
            </div>
          )}

          <p className="text-3xl font-bold mb-6">{formattedPrice}</p>

          <div className="flex items-center gap-4 mb-6">
  <div className="flex items-center border rounded overflow-hidden">
    <span className="px-4 py-2 text-lg text-center min-w-[40px]">{quantity}</span>
    <div className="flex flex-col border-l">
      <button
        onClick={() => setQuantity(quantity + 1)}
        className="px-2 py-1 text-xs leading-none border-b hover:bg-gray-100"
        aria-label="Increase quantity"
      >
        ▲
      </button>
      <button
        onClick={() => setQuantity(Math.max(1, quantity - 1))}
        className="px-2 py-1 text-xs leading-none hover:bg-gray-100"
        aria-label="Decrease quantity"
      >
        ▼
      </button>
    </div>
  </div>
  <button
    onClick={handleAddToCart}
    disabled={isLoading}
    className="bg-[#DBAC2B] text-[15px] text-gray-800 px-8 py-3 rounded-[4px] font-semibold hover:bg-black hover:text-white disabled:opacity-50"
  >
    {isLoading ? 'Adding...' : 'Add to cart'}
  </button>
</div>

          {product.categories?.[0] &&
            typeof product.categories[0] === 'object' && (
              <p className="text-sm text-muted-foreground">
                Category: {product.categories[0].title}
              </p>
            )}
        </div>
      </div>
      <ProductReviews
        reviewDescription={ typeof product.reviewDescription === 'object' && product.reviewDescription !== null
      ? extractText(product.reviewDescription)
      : product.reviewDescription}
        productTitle={product.title}
        productId={product.id}
      />
    </section>
  )
}