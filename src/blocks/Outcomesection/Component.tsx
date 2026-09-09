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
  FaPlay,
  FaMedal,
  FaShieldHalved
} from 'react-icons/fa6'
import { ArrowRight } from 'lucide-react'
import { Media } from '@/components/Media'

const SquarePlayIcon = ({ className = '' }: { className?: string }) => (
  <span className={`relative inline-block ${className}`}>
    <FaRegSquare className="absolute inset-0 w-full h-full" />
    <FaPlay className="absolute inset-0 m-auto w-[35%] h-[35%]" />
  </span>
)

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
  FaMedal,
  FaShieldHalved,
  SquarePlayIcon
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
  <>
    {/* Cards + CTA in one flex-wrap row */}
    <div className="flex flex-wrap gap-6">
      {/* Regular Cards - fixed 25% / 50% / 100% width */}
      {cards?.map((card, i) => {
        const Icon =
          card.icon && typeof card.icon === 'string'
            ? iconMap[card.icon]
            : null
        return (
          <div
            key={i}
            className="w-full sm:w-[calc(50%-12px)] sm:shrink-0 lg:w-[calc(25%-18px)] border border-gray-200 rounded-lg p-6 hover:bg-[#dbac2b] transition-color"
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

      {/* CTA Card - same base width, but grows to fill the rest of its line */}
      {ctaCard && (
        <div className="grow w-full sm:w-[calc(50%-12px)] sm:shrink-0 lg:w-[calc(25%-18px)] rounded-lg p-8 flex flex-col justify-between min-h-[280px] overflow-hidden relative">
          {/* Your existing background / overlay code */}
          {ctaCard.backgroundImage &&
          typeof ctaCard.backgroundImage === 'object' ? (
            <>
              <Media
                resource={ctaCard.backgroundImage}
                className="absolute inset-0 w-full h-full"
                imgClassName="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gray-900/70" />
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900" />
          )}

          <h3 className="relative z-10 text-white text-2xl md:text-[40px] font-[400] leading-tight mb-8 font-sans">
            {ctaCard.heading || 'Call Us Today to Schedule to understand more!'}
          </h3>
          <div className="relative z-10">
            {ctaCard.ctaLink && (
              <CMSLink
                {...ctaCard.ctaLink}
                className="group inline-flex items-center gap-2 bg-[#c8a23c] hover:bg-black text-black hover:text-white font-semibold px-6 py-3 rounded transition-colors"
              >
                <ArrowRight className="h-4 w-4" />
              </CMSLink>
            )}
          </div>
        </div>
      )}
    </div>
  </>
)}
      </div>
    </section>
  )
}