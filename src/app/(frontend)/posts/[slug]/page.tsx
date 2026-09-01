import type { Metadata } from 'next'

import { RelatedPosts } from '@/blocks/RelatedPosts/Component'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'
import Link from 'next/link'

import type { Post } from '@/payload-types'

import { PostHero } from '@/heros/PostHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'

export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config: configPromise })
    const posts = await payload.find({
      collection: 'posts',
      draft: false,
      limit: 1000,
      overrideAccess: false,
      pagination: false,
      select: { slug: true },
    })
    return posts.docs.map(({ slug }) => ({ slug }))
  } catch (error) {
    console.warn('Could not fetch static params for posts during build:', error)
    return []
  }
}

type Args = {
  params: Promise<{ slug?: string }>
}

export default async function Post({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const url = '/posts/' + decodedSlug
  const post = await queryPostBySlug({ slug: decodedSlug })

  if (!post) return <PayloadRedirects url={url} />

  return (
    <article>
      <PageClient />
      <PayloadRedirects disableNotFound url={url} />
      {draft && <LivePreviewListener />}

      <PostHero post={post} />

      {/* Content */}
      <div className="container py-3">
        <div className="max-w-3xl mx-auto">
          <RichText className="prose prose-lg max-w-none" data={post.content} enableGutter={false} />
        </div>
      </div>

      {/* CTA Section */}
      <div className="container py-12">
        <div className="max-w-3xl mx-auto bg-[#DCDCDC] rounded-lg p-10 text-center">
          <h2 className="text-[20px] font-[500] text-black mb-4">
            Optimize Resources, Achieve Success
          </h2>
          <Link
            href="/shop"
            className="inline-block bg-black text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Explore Our Services
          </Link>
        </div>
      </div>

      {/* FAQ Section */}
      {post.faq && post.faq.length > 0 && (
        <div className="container py-12">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">FAQ</h2>
            <div className="space-y-6">
              {post.faq.map((item, index) => (
                <div key={item.id ?? index} className="border-b border-border pb-6">
                  <p className="font-semibold mb-2">
                    {index + 1}. {item.question}
                  </p>
                  <p className="text-muted-foreground">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* What do you think? */}
      <div className="container py-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">What do you think?</h2>
          <button className="text-muted-foreground hover:underline text-sm">
            Show comments / Leave a comment
          </button>
        </div>
      </div>

      {/* Related Posts */}
      {post.relatedPosts && post.relatedPosts.length > 0 && (
        <div className="container py-12">
          <h2 className="text-3xl font-bold mb-2">Related Industry Trends</h2>
          <h3 className="text-3xl font-bold mb-8">& Real Results</h3>
          <RelatedPosts
            docs={post.relatedPosts.filter((p) => typeof p === 'object')}
          />
        </div>
      )}
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const post = await queryPostBySlug({ slug: decodedSlug })
  return generateMeta({ doc: post })
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'posts',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: { slug: { equals: slug } },
  })
  return result.docs?.[0] || null
})