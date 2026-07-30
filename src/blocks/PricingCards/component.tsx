import React from 'react'
import type {PricingCardsBlock} from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/ui'

export const PricingCardsBlockComponent: React.FC<PricingCardsBlock> = (props) => {
  const { heading, subtitle, description, cards } = props

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 flex justify-between">
            <div>
          <div className="mb-3 border border-border rounded-xs bg-[#D3D3D3] w-23 h-6 flex items-center justify-center">
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
            <p className="text-sm text-left mt-15 text-muted-foreground max-w-2xl mx-auto">
              {description}
            </p>
          )}
          </div>
        </div>

        {/* Pricing Cards */}
        {cards && cards.length > 0 && (
          <div className="flex flex-wrap justify-center gap-15">
            {cards.map((card, index) => (
              <div
                key={index}
                className="w-full sm:w-[calc(33.333%-1.5rem)] min-w-[280px] max-w-[300px] border border-border rounded-lg bg-white flex flex-col hover:border-[#dbac2b]"
              >
                {/* Card Header */}
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
{/* [#dbac2b] */}
                {/* Features List */}
                <div className="bg-[#DCDCDC] hover:bg-[#dbac2b] flex-1 flex flex-col p-6">
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
                     <span className="hover:text-white" aria-hidden="true">→</span>
                    </CMSLink>
                  </div>
                )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}