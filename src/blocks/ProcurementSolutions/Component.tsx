import React from 'react'
import type { ProcurementSolutionsBlock } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { ArrowRight } from 'lucide-react'

export const ProcurementSolutionsBlockComponent: React.FC<ProcurementSolutionsBlock> = ({
  title,
  subtitle,
  description,
  media,
  ctaLink,
}) => {
  return (
    <div className='px-4 pb-16'>
    <section className="py-16 px-10 bg-[#DCDCDC] border rounded-md">
      <div className="container mx-auto max-w-6xl">
        {/* Two columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <div className="pl-3 border-l border-black">
            <h2 className=" text-[14px] md:text-[18px] font-[400] text-black font-sans">{title}</h2>
            </div>
            <div className="mt-6 pl-3 border-l border-gray-700">
            {subtitle && (
              <p className="text-muted-foreground text-[12px]">{subtitle}</p>
            )}
            </div>
          </div>
          <div className="pl-5 border-l border-gray-700">
            {description && (
              <p className="text-[12px] text-gray-900 leading-relaxed whitespace-pre-line">
                {description}
              </p>
            )}
          </div>
        </div>

        {/* Image + CTA */}
        <div className="relative h-[400px] lg:h-[550px] w-full overflow-hidden rounded-lg">
          {media && typeof media === 'object' && (
            <Media resource={media} fill priority imgClassName="h-full w-full object-cover" />
          )}
          {ctaLink && (
            <div className="absolute bottom-6 right-6">
              <CMSLink
                {...ctaLink}
                className="inline-flex items-center gap-2 bg-[#dbac2b] text-black hover:bg-white px-6 py-3 rounded-md font-medium"
              >
                <ArrowRight className="ml-4 h-5 w-5" />
              </CMSLink>
            </div>
          )}
        </div>
      </div>
    </section>
    </div>
  )
}