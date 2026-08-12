import React from 'react';
import type { PricingComparisonBlock } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import {ArrowRight} from 'lucide-react'

export const PricingComparisonBlockComponent: React.FC<PricingComparisonBlock> = (props) => {
  const { badge, heading, description, cards } = props

  return (
    <section className="py-16 px-10 bg-white">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mb-12">
        <div>

          {badge && (
            <div className="mb-3 border border-border rounded-xs w-auto h-6 inline-flex items-center justify-center bg-[#DCDCDC] px-3">
              <p className="text-xs text-black">{badge}</p>
            </div>
          )}
          {heading && (
            <h2 className="text-[50px] font-[440] text-black mb-4 max-w-2xl">{heading}</h2>
          )}
          </div>
          <div>
          {description && (
            <p className="text-sm text-muted-foreground max-w-xl mt-18 ">{description}</p>
          )}
        </div>
        </div>

        {/* Cards */}
        {cards && cards.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cards.map((card, index) => (
              <div
                key={index}
                className="group border border-border rounded-lg bg-white hover:border-[#dbac2b] flex flex-col"
              >
                <div className="p-6">
                  <h3 className="text-[38px] font-[400] text-black">{card.name}</h3>
                  {card.tagline && (
                    <p className="text-[16px] text-black font-[350] mt-4">{card.tagline}</p>
                  )}
                  {card.description && (
                    <p className="text-[14px] text-muted-foreground mt-2">{card.description}</p>
                  )}
                </div>

                <div className="bg-gray-100 group-hover:bg-[#dbac2b] flex-1 flex flex-col p-6">
                  {card.features && card.features.length > 0 && (
                    <ul className="space-y-3 mb-6 flex-1">
                      {card.features.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-black">
                          <ArrowRight className="size-4 mt-0.5" />
                          <span>{item.feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {card.ctaLink && (
                    <div className="mt-auto flex justify-end pt-4">
                      <CMSLink
                        {...card.ctaLink}
                        appearance="default"
                        className="justify-center flex items-center gap-2 text-black bg-white hover:bg-black hover:text-white px-4 py-2 rounded-xs text-sm font-medium"
                      >
                        <ArrowRight className="size-4 ml-6" />
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