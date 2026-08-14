'use client'
import React from 'react'
import type { OutcomeSectionBlock } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import {
  FaPiggyBank,
  FaPenToSquare,
  FaBoxesStacked,
  FaLightbulb,
  FaGears,
  FaChess,
  FaWandMagicSparkles,
  FaBox,
  FaMoneyBill,
  FaUniversalAccess,
  FaClock,
  FaGavel,
  FaBullseye,
  FaChartLine,
  FaLeaf,
  FaClipboard,
   FaRegSquare,
  FaMedal,
} from 'react-icons/fa6'
import { ArrowRight } from 'lucide-react'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FaPiggyBank,
  FaPenToSquare,
  FaBoxesStacked,
  FaLightbulb,
  FaGears,
  FaChess,
  FaWandMagicSparkles,
  FaBox,
  FaMoneyBill,
  FaUniversalAccess,
  FaClock,
  FaGavel,
  FaBullseye,
  FaChartLine,
  FaLeaf,
  FaClipboard,
  FaRegSquare,
  FaMedal,
}

export const OutcomeSectionBlockComponent: React.FC<OutcomeSectionBlock> = ({
  badge,
  heading,
  cards,
  ctaCard,
}) => {
  const totalItems = (cards?.length || 0) + (ctaCard ? 1 : 0)

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Header */}
        {badge && (
          <span className="inline-block bg-gray-200 text-gray-800 text-sm font-medium px-4 py-1 rounded-xs mb-4">
            {badge}
          </span>
        )}
        {heading && (
          <h2 className="text-4xl md:text-[40px] leading-relaxed font-sans font-[400] text-gray-900 mb-12">
            {heading}
          </h2>
        )}

        {/* Cards Grid - all items including CTA */}
        {totalItems > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Regular Cards */}
            {cards?.map((card, i) => {
              const Icon = card.icon && typeof card.icon === 'string' ? iconMap[card.icon] : null
              return (
                <div
                  key={i}
                  className="border border-gray-200 rounded-lg p-6 hover:bg-[#dbac2b] transition-color"
                >
                  {Icon && (
                    <div className="mb-4">
                      <Icon className="size-8 text-black" />
                    </div>
                  )}
                  <h3 className="text-[25px] font-[500] text-gray-900 mb-4">
                    {card.title}
                  </h3>
                  <p className="text-gray-900 text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>
              )
            })}

            {/* CTA Card - stays in same row if space available */}
            {ctaCard && (
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-8 flex flex-col justify-between min-h-[280px] overflow-hidden relative">
                <div className="absolute inset-0 opacity-10">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        'repeating-linear-gradient(45deg, transparent, transparent 10px, white 10px, white 12px)',
                    }}
                  />
                </div>
                <h3 className="relative text-white text-2xl md:text-3xl font-bold leading-tight mb-8">
                  {ctaCard.heading || 'Call Us Today to Schedule to understand more!'}
                </h3>
                <div className="relative">
                  {ctaCard.ctaLink && (
                   <CMSLink
                      {...ctaCard.ctaLink}
                      className="group inline-flex items-center gap-2 bg-[#c8a23c] hover:bg-[#b8922c] text-white font-semibold px-6 py-3 rounded transition-colors"
                    >
                      <ArrowRight className="h-4 w-4" />
                   </CMSLink>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}