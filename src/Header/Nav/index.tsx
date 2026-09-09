'use client'

import React, { useCallback, useRef, useState } from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import Link from 'next/link'
import { ChevronDown, Phone } from 'lucide-react'
import { cn } from '@/utilities/ui'

const HOVER_DELAY = 250 // ms before the dropdown closes after leaving

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  const phone = data?.phone || ''
  const logo = data?.logo
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
  }, [])

  const scheduleClose = useCallback(() => {
    clearCloseTimer()
    closeTimerRef.current = setTimeout(() => setOpenIndex(null), HOVER_DELAY)
  }, [clearCloseTimer])

  const openDropdown = useCallback(
    (i: number) => {
      clearCloseTimer()
      setOpenIndex(i)
    },
    [clearCloseTimer],
  )

  return (
    <nav className="flex justify-center items-center gap-6">
      {logo && typeof logo === 'object' && (
        <Link href="/" className="shrink-0 mr-8">
          <Media resource={logo} imgClassName="h-10 w-auto" loading="eager" priority />
        </Link>
      )}

      {navItems.map((item, i) => {
        const hasChildren = item.children && item.children.length > 0
        const isOpen = openIndex === i

        return (
          <div
            key={i}
            className="relative"
            onMouseEnter={() => hasChildren && openDropdown(i)}
            onMouseLeave={() => hasChildren && scheduleClose()}
          >
            <div className="flex items-center gap-1 ml-4">
              <CMSLink
                {...item.link}
                appearance="link"
                className="text-sm font-medium text-black"
              />
              {hasChildren && (
                <button
                  type="button"
                  aria-label="Toggle dropdown"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="text-black focus:outline-none"
                >
                  <ChevronDown
                    className={cn('size-4 transition-transform', isOpen && 'rotate-180')}
                  />
                </button>
              )}
            </div>

            {hasChildren && (
              <ul
                onMouseEnter={clearCloseTimer}
                onMouseLeave={() => scheduleClose()}
                className={cn(
                  'absolute left-0 top-full z-50 mt-2 min-w-52 rounded-md border border-border bg-white py-2 shadow-lg transition-all duration-300',
                  isOpen
                    ? 'pointer-events-auto opacity-100 translate-y-0'
                    : 'pointer-events-none opacity-0 -translate-y-1',
                )}
              >
                {(item.children || []).map((child, j) => (
                  <li key={j}>
                    <CMSLink
                      {...child.link}
                      appearance="link"
                      className="block px-4 py-2 text-sm text-black hover:bg-[#DCDCDC] transition-colors"
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        )
      })}

      {phone && (
        <a
          href={`tel:${phone.replace(/\s/g, '')}`}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <Phone className="size-4 text-black" />
          <span className="text-black">{phone}</span>
        </a>
      )}
    </nav>
  )
}