import { formatDateTime } from '@/utilities/formatDateTime'
import React from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import { formatAuthors } from '@/utilities/formatAuthors'

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const { categories, heroImage, populatedAuthors, publishedAt, title } = post

  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ''

  return (
  <div className="bg-[#DCDCDC]">
    <div className="container py-16 flex flex-col items-center text-center">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-800 mb-8 font-sans">
        <a href="/" className="hover:underline">Home</a>
        <span className="mx-2">&gt;</span>
        <span>Insights &amp; Success Stories</span>
      </div>

      {/* Title */}
      <h1 className="text-4xl md:text-4xl lg:text-6xl font-normal text-black mb-8 max-w-4xl font-sans">
        {title}
      </h1>

      {/* Category badge + Date */}
      <div className="flex items-center justify-center gap-4 text-sm text-gray-600 font-sans">
        {categories?.map((category, index) => {
          if (typeof category === 'object' && category !== null) {
            const { title: categoryTitle } = category
            const titleToUse = categoryTitle || 'Untitled category'
            return (
              <span
                key={index}
                className="border border-gray-400 rounded-sm bg-white px-4 py-1 text-black font-sans"
              >
                {titleToUse}
              </span>
            )
          }
          return null
        })}
        {publishedAt && (
          <time className="font-sans">{formatDateTime(publishedAt)}</time>
        )}
      </div>
    </div>
  </div>
)
}
