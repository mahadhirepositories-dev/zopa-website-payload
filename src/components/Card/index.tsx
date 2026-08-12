'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'

export type CardPostData = Pick<Post, 'slug' | 'categories' | 'meta' | 'title' | 'publishedAt'>

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props

  const { slug, categories, meta, title, publishedAt } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ')
  const href = `/${relationTo}/${slug}`

  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  return (
    <article
      className={cn(
        'overflow-hidden bg-white hover:cursor-pointer',
        className,
      )}
      ref={card.ref}
    >
      <Link className="not-prose block" href={href} ref={link.ref}>
        <div className="relative w-full aspect-[16/10] overflow-hidden rounded-lg">
          {!metaImage && <div className="bg-gray-200 w-full h-full" />}
          {metaImage && typeof metaImage !== 'string' && (
            <Media resource={metaImage} size="33vw" className="w-full h-full" imgClassName="w-full h-full object-cover" />
          )}
        </div>
      </Link>
      <div className="mt-4">
        {showCategories && hasCategories && (
          <div className="flex items-center gap-3 mb-2">
            {categories?.map((category, index) => {
              if (typeof category === 'object') {
                const { title: titleFromCategory } = category
                const categoryTitle = titleFromCategory || 'Untitled category'
                const isLast = index === categories.length - 1
                return (
                  <Fragment key={index}>
                    <span className="inline block border border-[#DCDCDC] bg-[#DCDCDC] border-rounded-xs text-xs text-gray-800 p-1">{categoryTitle}</span>
                    {!isLast && <Fragment>, &nbsp;</Fragment>}
                  </Fragment>
                )
              }
              return null
            })}
            {formattedDate && (
              <span className="text-xs text-gray-500">{formattedDate}</span>
            )}
          </div>
        )}
        {titleToUse && (
          <div>
            <Link className="not-prose" href={href}>
              <h3 className="text-lg font-semibold text-black leading-snug hover:underline">
                {titleToUse}
              </h3>
            </Link>
          </div>
        )}
        {description && (
          <p className="mt-2 text-sm text-gray-600 line-clamp-4">{sanitizedDescription}</p>
        )}
      </div>
    </article>
  )
}