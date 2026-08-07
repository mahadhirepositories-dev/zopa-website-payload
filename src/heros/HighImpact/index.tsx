'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { ArrowRight } from 'lucide-react'

export const HighImpactHero: React.FC<NonNullable<Page['hero']>> = ({ links, media, richText,stats }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (
    <div
      className="relative -mt-20 flex min-h-screen items-end text-white"
      data-theme="dark"
    >
      <div className="min-h-screen absolute inset-0 select-none">
        {media && typeof media === 'object' && (
          <Media fill imgClassName="-z-10 object-cover" priority resource={media} />
        )}
        {/* dark overlay */}
        <div className="absolute inset-0 bg-black/50 -z-5"/>
      </div>

      {/* content */}
      <div className="container relative z-10 pt-40 pb-20 flex items-end justify-between">
        <div className="max-w-2xl">
          {richText && <RichText className="mb-8" data={richText} enableGutter={false}/>}
          {Array.isArray(links) && links.length>0 && (
            <ul className='flex gap-4'>
              {links.map(({link},i)=>(
                <li key={i}>
                  <CMSLink {...link}
                  className="bg-[#dbac2b]"><ArrowRight className="h-4 w-4"/></CMSLink>
                </li>
              ))}
            </ul>
          )}
        </div>
      

      {/* stats cards */}
      {Array.isArray(stats) && stats.length>0 && (
        <div className="flex gap-0">
            {stats.map(({value,label},i)=>(
              <div key={i} className={`h-50 w-50 text-left  ${i%2===0 ? 'bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xs':'bg-[#dbac2b] text-black rounded-xs'}`}>
                 <div className="text-white mt-3 ml-3"><h2 className="text-6xl">{value}</h2></div>
                 <div className="text-sm text-white/80 mt-20 ml-3">{label}</div>
              </div>

            ))}
        </div>
      )}
      </div>

    </div>
  )
}
