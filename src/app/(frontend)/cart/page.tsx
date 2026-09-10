import type { Metadata } from 'next'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import CartContent from './Cartcontent'

export const metadata: Metadata = {
  title: 'Cart | Zopa',
}

export default async function CartPage() {
  let layout: any[] = []

  try {
    const { isEnabled: draft } = await draftMode()
    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
      collection: 'pages',
      draft,
      limit: 1,
      depth: 4,
      where: { slug: { equals: 'cart' } },
    })

    const page = result.docs?.[0]
    layout = page?.layout ?? []
  } catch {
    layout = []
  }

  return (
    <>
      <RenderBlocks blocks={layout} />
      <CartContent />
    </>
  )
}