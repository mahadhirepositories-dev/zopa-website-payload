import type { Metadata } from 'next'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import CheckoutContent from './Checkoutcontent'

export const metadata: Metadata = {
  title: 'Checkout | Zopa',
}

export default async function CheckoutPage() {
  let layout: any[] = []

  try {
    const { isEnabled: draft } = await draftMode()
    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
      collection: 'pages',
      draft,
      limit: 1,
      depth: 4,
      where: { slug: { equals: 'checkout' } },
    })

    layout = result.docs?.[0]?.layout ?? []
  } catch {
    layout = []
  }

  return (
    <>
      <RenderBlocks blocks={layout} />
      <CheckoutContent />
    </>
  )
}