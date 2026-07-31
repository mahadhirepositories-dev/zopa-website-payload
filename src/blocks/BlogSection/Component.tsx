import configPromise from '@payload-config'
import {getPayload} from 'payload'
import React from 'react'
import type {Post,BlogSectionBlock} from '@/payload-types'
import {Media} from '@/components/Media'
import {CMSLink} from '@/components/Link'
import {ArrowRight} from 'lucide-react'

const formatDate = (timestamp: string): string =>
  new Date(timestamp).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

const BlogCard: React.FC<{ post: Post }> = ({ post }) => {
  const { categories, heroImage, publishedAt, slug, title } = post
  const href = `/posts/${slug}`

  return (
    <article className="border border-border rounded-lg overflow-hidden bg-card flex flex-col">
      <div className="relative aspect-[16/9] w-full overflow=hidden">
        {heroImage && typeof heroImage !== 'string' && <Media resource={heroImage} fill imgClassName="object-cover" />}
      </div>
      <div className="p-3">
        <div className="flex items-center gap-4 mb-2">
          {categories?.map((category) => {
            if (typeof category === 'object' && category !== null) {
              return (
                <span key={category.id} className="text-[#dbac2b] uppercase text-xs">
                  {category.title || 'Untitled category'}
                </span>
              )
            }
            return null
          })}
          {publishedAt && (
            <time dateTime={publishedAt} className="text-xs text-white/60">
              {formatDate(publishedAt)}
            </time>
          )}
        </div>
        <h3 className="text-base font-medium leading-snug">
          <a href={href}>{title}</a>
        </h3>
      </div>
    </article>
  )
}

export const BlogSectionBlockComponent: React.FC<BlogSectionBlock> = async (props) => {
  const { heading, title, limit, viewMoreLink } = props

  const payload = await getPayload({ config: configPromise })

  const fetchedPosts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: limit || 2,
    sort: '-publishedAt',
  })

  const posts = fetchedPosts.docs as Post[]

  return (
    <section className=" py-16 px-10 bg-white">
        <div className='border rounded-xs bg-[#D3D3D3] w-22 h-6 flex items-center justify-center'>
       <h2 className="text-xs text-black">{heading}</h2>
       </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start mt-3">
        <div className="lg:sticky lg:top-8">
          {title && <p className="text-2xl md:text-3xl lg:text-4xl font-semibold text-black">{title}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>

      {viewMoreLink && (
        <div className="flex justify-start mt-42">
          <CMSLink {...viewMoreLink} className="bg-[#dbac2b]">
             <ArrowRight className="w-4 h-4" />
          </CMSLink>
        </div>
      )}
    </section>
  )
}
