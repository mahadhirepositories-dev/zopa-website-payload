'use client'

import React from 'react'
import { useCart } from '@payloadcms/plugin-ecommerce/client/react'

export const AddToCartButton = ({
  productId,
}: {
  productId: number
}) => {
  const { addItem, isLoading } = useCart()

  return (
    <button
      onClick={() => addItem({ product: productId }, 1)}
      disabled={isLoading}
      className="w-full bg-primary text-primary-foreground py-2 rounded font-semibold hover:opacity-90 disabled:opacity-50"
    >
      {isLoading ? 'Adding...' : 'Add to cart'}
    </button>
  )
}