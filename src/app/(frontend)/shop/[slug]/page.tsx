import type { Metadata } from 'next'
import React from 'react'
import { draftMode } from 'next/headers'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'

import { ProductDetailBlockComponent } from '@/blocks/Productdetail/Component'
import { RenderBlocks } from '@/blocks/RenderBlocks'

type Args = {
  params: Promise<{ slug: string }>
}

export default async function ProductPage({ params: paramsPromise }: Args) {
  const { slug } = await paramsPromise

  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'products',
    draft,
    limit: 1,
    depth: 3,
    where: { slug: { equals: slug } },
  })

  const product = result.docs[0]
  if (!product) return notFound()

  const hasDetailBlock = product.layout?.some(
    (b) => b.blockType === 'productDetail',
  )

  const detailBlock = hasDetailBlock
    ? (product.layout?.find((b) => b.blockType === 'productDetail') ?? {})
    : { showBreadcrumb: true, showGallery: true }

  return (
  <>
    {product.layout && product.layout.length > 0 && (
      <div className="mt-16">
        <RenderBlocks blocks={product.layout} />
      </div>
    )}
    
    <ProductDetailBlockComponent
      blockType="productDetail"
      {...(detailBlock as Record<string, unknown>)}
      product={product}
    />
  </>
)
}

export async function generateMetadata({
  params: paramsPromise,
}: Args): Promise<Metadata> {
  const { slug } = await paramsPromise
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'products',
    draft: false,
    limit: 1,
    where: { slug: { equals: slug } },
  })

  const product = result.docs[0]
  if (!product) return { title: 'Product Not Found' }

  return {
    title: `${product.title} | Zopa Shop`,
    description: product.description || '',
  }
}