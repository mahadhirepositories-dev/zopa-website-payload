import React from 'react'
import type { AboutUsBlock } from '@/payload-types'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'
import { ArrowRight, Check } from 'lucide-react'

export const AboutUsBlockComponent: React.FC<AboutUsBlock> = ({
  image,
  label,
  heading,
  content,
  features,
  cardTitle,
  cardPoints,
  ctaLink,
}) => {
  return (
    <section className="py-[100px] px-[50px] bg-white">
      <div className="container max-w-[1280px]">
        <div className="grid grid-cols-1 lg:grid-cols-[42%_42%] gap-40 lg:gap-45 items-start">
          {/* LEFT COLUMN (42%) — Image */}
          <div className="relative">
            <div className="rounded-xl overflow-hidden">
              {image && typeof image === 'object' ? (
                <Media
                  resource={image}
                  className="w-full"
                  imgClassName="w-full object-cover aspect-[1.8/2.5]"
                />
              ) : (
                <div className="aspect-[4/3] bg-muted flex items-center justify-center text-muted-foreground">
                  Image
                </div>
              )}
            </div>

            {/* FLOATING FEATURE CARD — overlaps image / column boundary */}
            {(cardTitle || cardPoints?.length || ctaLink) && (
              <div className="mt-8 lg:mt-0 lg:absolute lg:-right-22 lg:-bottom-18 lg:w-[280px] bg-[#dbac2b] rounded-md shadow-xl p-6">
                {cardTitle && <h3 className="text-[20px] font-[400] text-black mb-4 font-sans">{cardTitle}</h3>}
                {cardPoints && cardPoints.length > 0 && (
                  <ul className="space-y-3">
                    {cardPoints?.map((point, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <ArrowRight className="w-4 h-4 mt-1 text-black" />
                        <span className="text-sm text-black">{point.point}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {ctaLink && (
                  <div className="mt-6">
                    <CMSLink
                      {...ctaLink}
                      className="inline-flex items-center gap-12 bg-gray-800 text-white hover:bg-black px-6 py-3 rounded-md font-medium"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </CMSLink>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN (42%) — Text */}
          <div className="mb-30">
            {label && (
              <span className="inline-flex border border-border rounded-xs bg-[#dbac2b] px-3 h-6 items-center justify-center text-xs text-black">
                {label}
              </span>
            )}
            {heading && (
              <h2 className="mt-5 text-[30px] md:text-5xl font-[400] text-black font-sans">{heading}</h2>
            )}
            {content && (
              <div className="mt-6 text-gray-800">
                <RichText data={content} enableGutter={false} />
              </div>
            )}
            {features && features.length > 0 && (
              <ul className="mt-8 space-y-3">
                {features.map((item, i) => (
                  <li key={i} className="flex items-center gap-2">    
                      <ArrowRight className="w-5 h-5 text-black" />
                    <span className="text-black">{item.feature}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}