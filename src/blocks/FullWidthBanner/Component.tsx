import React from 'react'
import type { FullWidthBannerBlock } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { ArrowRight } from 'lucide-react'

export const FullWidthBannerBlockComponent: React.FC<FullWidthBannerBlock> = ({
  heading,
  logo,
  media,
  links,
}) => {
  return (
    <div className="px-4">
    <section className="relative flex h-[700px] w-full items-center justify-center overflow-hidden px-6">
      {media && typeof media === 'object' && (
        <div className="absolute inset-0 z-0">
          <Media resource={media} fill priority imgClassName="h-full w-full object-cover" />
        </div>
      )}

      <div className="absolute inset-0 z-10 bg-black/60" />

      <div className="relative z-20 container flex flex-col items-center px-4 py-20 text-center text-white">
        {logo && typeof logo === 'object' && (
          <Media resource={logo} imgClassName="max-h-24 w-auto" />
        )}

        {heading && (
          <h4 className="mt-6 max-w-8xl font-bold leading-tight text-[40px] text-semibold">
            {heading}
          </h4>
        )}

        {Array.isArray(links) && links.length > 0 && (
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {links.map(({ link }, i) => (
              <CMSLink
                key={i}
                {...link}
                className="bg-[#dbac2b] text-black hover:bg-white"
              ><ArrowRight className="h-5 w-5 text-black" /></CMSLink>
            ))}
          </div>
        )}
      </div>
    </section>
    </div>
  )
}