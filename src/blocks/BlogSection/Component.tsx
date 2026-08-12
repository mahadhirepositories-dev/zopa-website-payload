import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import type { Post, BlogSectionBlock } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { ArrowRight } from 'lucide-react'
import { Card, CardPostData } from '@/components/Card'

export const BlogSectionBlockComponent: React.FC<BlogSectionBlock> = async (props) => {
  const { heading, title, limit, viewMoreLink } = props

  const payload = await getPayload({ config: configPromise })

  const fetchedPosts = await payload.find({
    collection: 'posts',
    depth: 2,
    limit: limit || 2,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      publishedAt: true,
    },
  })

  const posts = fetchedPosts.docs as CardPostData[]

  return (
    <section className="py-16 px-10 bg-white">
      <div className="border rounded-xs bg-[#D3D3D3] w-22 h-6 flex items-center justify-center">
        <h2 className="text-xs text-black">{heading}</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start mt-3">
        <div className="lg:sticky lg:top-8">
          {title && (
            <p className="text-2xl md:text-3xl lg:text-4xl font-semibold text-black">{title}</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {posts.map((post) => (
            <Card key={post.slug} doc={post} relationTo="posts" showCategories />
          ))}
        </div>
      </div>

      {viewMoreLink && (
        <div className="flex justify-start mt-30">
          <CMSLink {...viewMoreLink} className="bg-[#dbac2b]">
            <ArrowRight className="w-4 h-4" />
          </CMSLink>
        </div>
      )}
    </section>
  )
}