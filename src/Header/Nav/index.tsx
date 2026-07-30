'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import Link from 'next/link'
import { SearchIcon,Phone } from 'lucide-react'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  const phone=data?.phone || ''
  const logo=data?.logo

  return (
    <nav className="flex justify-center items-center gap-6">
      {/* logo */}
      {logo && typeof logo==='object' && (
        <Link href="/" className="shrink-0 mr-8">
          <Media
          resource={logo}
          imgClassName='h-10 w-auto'
          loading="eager"
          priority
          />
           
        </Link>
      )}

      {/* navigation links */}
       {navItems.map(({link},i)=>(
        <CMSLink key={i} {...link} appearance="link"
        className='text-sm font-medium text-black hover:text-foreground transition-colors'/>
       ))}

       {/* phone number */}
       {phone && (
        <a href={`tel:${phone.replace(/\s/g,'')}`}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <Phone className="size-4 text-black"/>
          <span className="text-black">{phone}</span>          
        </a>
       )}
    </nav>
  )
}
