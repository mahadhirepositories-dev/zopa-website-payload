import React from 'react'
import type {PricingCardsBlock} from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/ui'
import { Media } from '@/components/Media'
import {ArrowRight} from 'lucide-react'

export const PricingCardsBlockComponent: React.FC<PricingCardsBlock> = (props) => {
  const { heading, subtitle, description, cards } = props
  const isServices = cards?.[0]?.cardType === 'services'

  return (
    <section className={`py-16 px-10 ${isServices ? 'bg-gray-100' : 'bg-white'}`}>
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 flex justify-between">
            <div>
          <div className={`mb-3 border border-border rounded-xs w-23 h-6 flex items-center justify-center ${isServices ? 'bg-[#dbac2b]' : 'bg-[#D3D3D3]'}`}>
                <p className='text-xs text-black'>
                    {heading}
                </p>
                </div>
          {subtitle && (
            <h2 className="max-w-xl text-5xl text-left text-black mb-4">{subtitle}</h2>
          )}
          </div>
          <div>
          {description && (
            <p className="text-sm text-left mt-15 text-muted-foreground max-w-xl mx-auto">
              {description}
            </p>
          )}
          </div>
        </div>

        {/* Pricing Cards */}
        {cards && cards.length > 0 && (
          <div className={`flex flex-wrap justify-center ${isServices? 'gap-6' : 'gap-15'}`}>
            {cards.map((card, index) => (
              <div
                key={index}
                className={card.cardType==="services"? 'relative w-full sm:w-[calc(25%-1.125rem)] min-w-[240px] max-w-[320px] rounded-lg overflow-hidden flex flex-col':
                  'group w-full sm:w-[calc(33.333%-1.5rem)] min-w-[280px] max-w-[300px] border border-border rounded-lg bg-white flex flex-col hover:border-[#dbac2b] overflow-hidden'}
              >
                {/* Card Header */}
                {card.cardType === 'services' ? (
  /* ===== SERVICES CARD ===== */
  <>
    {card.backgroundImage && typeof card.backgroundImage !== 'string' && (
      <div className="absolute inset-0">
        <Media resource={card.backgroundImage} className="w-full h-full object-cover" />
      </div>
    )}
    <div className="relative z-10 flex flex-col justify-end min-h-[380px] p-4">
      {/* Inner card overlaid on image */}
      <div className="bg-white rounded-lg p-6 shadow-md mb-6">
        <h3 className="text-lg font-weight:300 text-black font-sans">{card.name}</h3>
        {card.ctaLink && (
          <CMSLink
            {...card.ctaLink}
            appearance="default"
            className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-black bg-white hover:bg-black hover:text-white px-4 py-2 rounded-md"
          >
             <ArrowRight className="size-4" />
           {/* <span aria-hidden="true" className="text-black hover:text-white">→</span> */}
          </CMSLink>
        )}
      </div>
    </div>
  </>
) :(
                  <>
                <div className="mb-6 p-6.5">
                  <h3 className="text-4xl font-weight:300 max-w-xs text-black font-sans">{card.name}</h3>
                  {card.tagline && (
                    <p className="text-sm text-black font-semibold mt-3">                                        
                      {card.tagline}
                    </p>
                  )}
                  {card.description && (
                    <p className="text-xs text-muted-foreground mt-2">
                      {card.description}
                    </p>
                  )}
                </div>

                {/* Features List */}
                <div className="bg-[#DCDCDC] group-hover:bg-[#dbac2b] flex-1 flex flex-col p-6">
                {card.features && card.features.length > 0 && (
                  <ul className="space-y-3 mb-8 mt-3 flex-1">
                    {card.features.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-black">
                        <span className="text-black mt-0.5 flex-shrink-0">→</span>
                        <span>{item.feature}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* CTA Button */}
                {card.ctaLink && (
                  <div className="mt-auto pt-4 border-t border-border">
                    <CMSLink {...card.ctaLink} appearance="default" className="w-full justify-center flex items-center gap-2 text-black bg-white hover:bg-black hover:text-white px-4 py-2 rounded-md text-sm font-medium">
                     <ArrowRight className="size-4 hover:text-white" />
                    </CMSLink>
                  </div>
                )}
                </div>
                </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}