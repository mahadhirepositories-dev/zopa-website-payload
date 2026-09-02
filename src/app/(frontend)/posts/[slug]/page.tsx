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
import { CommentForm } from '@/components/Commentform'

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
        <div className="max-w-5xl mx-auto">
          <RichText className="prose prose-lg max-w-none font-sans" data={post.content} enableGutter={false} />
        </div>
      </div>

      {/* CTA Section */}
      <div className="container py-12">
        <div className="max-w-5xl mx-auto bg-[#DCDCDC] rounded-lg p-10 text-center">
          <h2 className="text-[20px] font-[500] text-black mb-4">
            Optimize Resources, Achieve Success
          </h2>
          <Link
            href="/shop"
            className="inline-block bg-[#dbac2b] text-black px-8 py-3 rounded-lg font-semibold hover:bg-black hover:text-white transition-colors"
          >
            Explore Our Services
          </Link>
        </div>
      </div>

      {/* FAQ Section */}
      {post.faq && post.faq.length > 0 && (
        <div className="container py-12">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">FAQ</h2>
            <div className="space-y-6">
              {post.faq.map((item, index) => (
                <div key={item.id ?? index} className="border-b border-border pb-6">
                  <p className="font-semibold font-sans mb-2">
                    {index + 1}. {item.question}
                  </p>
                  <p className="text-gray-800 font-sans">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* What do you think? */}
      <div className="container py-12">
        <div className="max-w-3xl mx-auto bg-[#DCDCDC] rounded-lg p-10 text-center">
          <h2 className="text-2xl font-bold mb-6 text-black">What do you think?</h2>
          <hr className="border-gray-400 mb-6" />
          <CommentForm postId={String(post.id)} />
        </div>
     </div>

      {/* Related Posts */}
      {post.relatedPosts && post.relatedPosts.length > 0 && (
        <div className="container py-12">
          <div className="py-8">
          <span className="inline-block border border-gray-300 bg-[#DCDCDC] rounded-[5px] px-4 py-1 text-xs text-gray-700 mb-6">
           Insights &amp; Success Stories
          </span>
          <h2 className="md:text-4xl lg:text-5xl font-normal text-black mb-8 leading-tight max-w-4xl">
             Related Industry Trends<br />&amp; Real Results
          </h2>
          <RelatedPosts
           docs={post.relatedPosts.filter((p) => typeof p === 'object')}
          />
          </div>
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