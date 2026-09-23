import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'

import type { Page, Post,Product } from '@/payload-types'

type CMSLinkType = {
  anchor?: string | null
  appearance?: 'inline' | ButtonProps['variant']
  children?: React.ReactNode
  className?: string
  label?: string | null
  newTab?: boolean | null
  reference?: {
  relationTo: 'pages' | 'posts' | 'products'
  value: Page | Post | Product | string | number
  } | null
  size?: ButtonProps['size'] | null
  type?: 'custom' | 'reference' | null
  url?: string | null
}

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const {
    anchor,
    type,
    appearance = 'inline',
    children,
    className,
    label,
    newTab,
    reference,
    size: sizeFromProps,
    url,
  } = props

  const getHref = (relationTo: string, slug: string) => {
  if (relationTo === 'products') return `/shop/${slug}`
  return relationTo !== 'pages' ? `/${relationTo}/${slug}` : `/${slug}`
}

  const baseHref =
    type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
    ? getHref(reference.relationTo, reference.value.slug)
    : url
 
  const normalizedAnchor = anchor?.trim().replace(/^#/, '')
  const href =
    baseHref && normalizedAnchor && !baseHref.includes('#')
      ? `${baseHref}#${normalizedAnchor}`
      : baseHref


  if (!href) return null

  const size = appearance === 'link' ? 'clear' : sizeFromProps
   const isExternal = /^(https?:\/\/|mailto:|tel:)/i.test(href || '')
   const newTabProps = newTab && isExternal ? { rel: 'noopener noreferrer', target: '_blank' } : {}
  /* Ensure we don't break any styles set by richText */
  if (appearance === 'inline') {
    return (
      <Link className={cn(className)} href={href || url || ''} {...newTabProps}>
        {label && <span>{label}</span>}
        {children}
      </Link>
    )
  }

  return (
    <Button asChild className={className} size={size} variant={appearance}>
      <Link className={cn(className)} href={href || url || ''} {...newTabProps}>
        {label && <span>{label}</span>}
        {children}
      </Link>
    </Button>
  )
}
