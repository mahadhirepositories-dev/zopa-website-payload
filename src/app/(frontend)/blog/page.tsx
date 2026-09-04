import type { Metadata } from 'next/types'
import { CollectionArchive } from '@/components/CollectionArchive'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { RenderBlocks } from '@/blocks/RenderBlocks'


export const dynamic = 'force-dynamic'

export default async function BlogPage() {
  const payload = await getPayload({ config: configPromise })
  const blogPage = await payload.find({
    collection: 'pages',
    limit: 1,
    pagination: false,
    overrideAccess: false,
    where: { slug: { equals: 'blog' } },
  })
  const topBlocks = blogPage.docs?.[0]?.layout ?? []

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 100,           // fetch ALL posts so Load More can reveal them
    pagination: false,
    overrideAccess: false,
    sort: '-publishedAt', // newest first
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      publishedAt: true,
    },
  })

  return (
    <div>
         <RenderBlocks blocks={topBlocks as any} />
         <div className="pt-6 pb-6">
           <CollectionArchive posts={posts.docs} />
         </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Blog | ZOPA',
  }
}