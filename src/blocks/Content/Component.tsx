import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'

import { CMSLink } from '../../components/Link'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns } = props

  const sizeClasses: Record<string, string> = {
    full: 'w-full',
    half: 'w-full sm:w-[calc(50%-1rem)]',
    oneThird: 'w-full sm:w-[calc(33.333%-1rem)]',
    twoThirds: 'w-full sm:w-[calc(66.666%-1rem)]',
    oneQuarter: 'w-full sm:w-[calc(25%-1.5rem)]',
  }

  return (
    <section className='bg-black min-h-[250px] flex items-center justify-center'>
    <div className="container my-10">
      
      <div className="flex flex-wrap items-center justify-center gap-8">
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const { enableLink, link, richText, size,style,stat,label  } = col

            return (
              <div
                className={cn(sizeClasses[size!], 'flex-shrink-0')}
                key={index}
              >
                {style==='stat' ?(
                  <div className="text-center">
                       {stat && <p className="text-5xl text-[#dbac2b] mb-2">{stat}</p>}
                       {label && <p className="text-sm text-white">{label}</p>}
                       {enableLink && <div className="mt-4"><CMSLink {...link} /></div>}
                  </div>
                ):(
                  <>
                {richText && <RichText data={richText} enableGutter={false} />}
                {enableLink && <CMSLink {...link} />}
                </>)}
              </div>
            )
          })}
      </div>
      
    </div>
    </section>
  )
}
