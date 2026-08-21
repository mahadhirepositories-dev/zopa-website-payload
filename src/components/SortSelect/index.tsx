'use client'

import React from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

export const SortSelect = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  return (
    <select
      aria-label="Sort products"
      defaultValue={searchParams.get('sort') || 'default'}
      onChange={(e) => {
        const params = new URLSearchParams(searchParams)
        if (e.target.value === 'default') params.delete('sort')
        else params.set('sort', e.target.value)
        router.push(params.toString() ? `${pathname}?${params}` : pathname)
      }}
      className="border rounded px-3 py-2 text-sm bg-background"
    >
      <option value="default">Default sorting</option>
      <option value="price-asc">Sort by price: low to high</option>
      <option value="price-desc">Sort by price: high to low</option>
    </select>
  )
}