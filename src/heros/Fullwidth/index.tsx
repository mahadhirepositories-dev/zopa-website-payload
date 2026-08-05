import React from 'react'
import type { Page } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'

export const FullWidthHero: React.FC<Page['hero']> = ({
  heading,
  logo,
  media,
  links,
}) => {
  return (
    <section className="relative flex min-h-[85vh] w-full items-center justify-center overflow-hidden">
      {media && typeof media === 'object' && (
        <div className="absolute inset-0 z-0">
          <Media resource={media} fill priority imgClassName="h-full w-full object-cover" />
        </div>
      )}

      <div className="absolute inset-0 z-10 bg-black/60" />

      <div className="relative z-20 container flex flex-col items-center px-4 text-center text-white">
        {logo && typeof logo === 'object' && (
          <Media resource={logo} imgClassName="max-h-24 w-auto" />
        )}

        {heading && (
          <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-tight md:text-5xl lg:text-6xl">
            {heading}
          </h1>
        )}

        {Array.isArray(links) && links.length > 0 && (
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {links.map(({ link }, i) => (
              <CMSLink
                key={i}
                {...link}
                className="bg-[#dbac2b] text-black hover:bg-white"
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}