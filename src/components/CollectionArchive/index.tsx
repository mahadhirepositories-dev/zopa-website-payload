'use client'
import { cn } from '@/utilities/ui'
import React, { useState } from 'react'
import { Card, CardPostData } from '@/components/Card'

export type Props = {
  posts: CardPostData[]   // keep the ORIGINAL prop name used by all callers
}

export const CollectionArchive: React.FC<Props> = ({ posts = [] }) => {
  const [visibleCount, setVisibleCount] = useState(12)

  const visiblePosts = posts.slice(0, visibleCount)
  const hasMore = visibleCount < posts.length

  const loadMore = () => setVisibleCount((prev) => prev + 12)

  return (
    <div className={cn('container')}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
        {visiblePosts.map((result, index) => {
          if (typeof result === 'object' && result !== null) {
            return (
              <div key={index}>
                <Card className="h-full" doc={result} relationTo="posts" showCategories />
              </div>
            )
          }
          return null
        })}
      </div>

      {hasMore && (
        <div className="mt-16 flex justify-center px-4 pt-8 pb-16">
          <button
            onClick={loadMore}
            className="px-10 py-3.5 bg-[#dbac2b] hover:bg-black text-black rounded-sm font-medium hover:bg-gray-800 hover:text-white transition-colors shadow-lg"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  )
}