import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import type { BlogSectionBlock } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { ArrowRight } from 'lucide-react'
import { Card, CardPostData } from '@/components/Card'

export const BlogSectionBlockComponent: React.FC<BlogSectionBlock> = async (props) => {
  const { heading, title, limit, viewMoreLink } = props

  let posts: CardPostData[] = []
  try {
    const payload = await getPayload({ config: configPromise })
    const fetchedPosts = await payload.find({
      collection: 'posts',
      depth: 2,
      limit: limit || 2,
    })
    posts = (fetchedPosts?.docs || []) as CardPostData[]
  } catch (err) {
    console.error('Error fetching blog section posts:', err)
  }

  return (
    <section className="py-16 px-10 bg-white">
      {heading && (
        <div className="border rounded-xs bg-[#D3D3D3] px-3 h-6 inline-flex items-center justify-center">
          <h2 className="text-xs text-black">{heading}</h2>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start mt-3">
        <div className="lg:sticky lg:top-8">
          {title && (
            <p className="text-2xl md:text-3xl lg:text-4xl font-semibold text-black">{title}</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {posts.map((post, idx) => (
            <Card key={post.slug || idx} doc={post} relationTo="posts" showCategories />
          ))}
        </div>
      </div>

      {viewMoreLink && (viewMoreLink.url || viewMoreLink.reference) && (
        <div className="flex justify-start mt-8">
          <CMSLink {...viewMoreLink} className="bg-[#dbac2b]">
            <ArrowRight className="w-4 h-4" />
          </CMSLink>
        </div>
      )}
    </section>
  )
}