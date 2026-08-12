import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 50,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      publishedAt: true,
    },
  })

  return (
    <div className="pt-24 pb-24">
      <PageClient />

      {/* Header Section */}
      <div className="container mb-12">
        <h1 className="text-5xl font-bold text-black mb-4">Blog</h1>
        <p className="text-gray-600 max-w-2xl text-sm">
          Explore expert advice, real-world case studies, and actionable strategies to drive growth and innovation in your business.
        </p>
      </div>

      {/* Posts Grid */}
      <CollectionArchive posts={posts.docs} />

      {/* Load More - handled by PageClient */}
      <div className="container mt-12 text-center">
        <PageClient totalPosts={posts.totalDocs} />
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Blog | ZOPA',
  }
}