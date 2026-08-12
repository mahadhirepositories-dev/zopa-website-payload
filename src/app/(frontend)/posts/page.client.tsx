'use client'

import React, { useState } from 'react'

type PageClientProps = {
  totalPosts?: number
}

export default function PageClient({ totalPosts = 0 }: PageClientProps) {
  const [visibleCount, setVisibleCount] = useState(12)
  const [isLoading, setIsLoading] = useState(false)

  const handleLoadMore = () => {
    setIsLoading(true)
    // Simulate a brief loading delay
    setTimeout(() => {
      setVisibleCount((prev) => prev + 12)
      setIsLoading(false)
    }, 300)
  }

  // This component only renders the Load More button
  // The actual posts are server-rendered, so we use CSS to hide excess posts
  return (
    <>
      {/* Load More button */}
      {visibleCount < totalPosts && (
        <button
          onClick={handleLoadMore}
          disabled={isLoading}
          className="mt-8 px-8 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Loading...' : 'Load More'}
        </button>
      )}
    </>
  )
}