'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { CMSLink } from '@/components/Link'
import { ArrowRight } from "lucide-react"
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])


  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white " {...(theme ? { 'data-theme': theme } : {})}>
      <div className="container flex h-20 items-center justify-between">

        {/* Nav+phone */}
    
        <HeaderNav data={data} />
        

        {/* cta button */}
        <div className="flex items-center gap-4">
            <ThemeSelector />
            {data?.ctalink && (
            <div className="shrink-0 bg-[#dbac2b] rounded-md w-48 h-10 flex justify-center items-center text-black">
                <CMSLink {...data.ctalink} size="lg" />
                <ArrowRight className="h-4 w-4" />
            </div>
             )}
        </div>
      </div>
    </header>
  )
}
