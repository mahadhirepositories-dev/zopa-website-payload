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
} from 'react-icons/fa6'

const iconMap = {
  FaPiggyBank: FaPiggyBank,
  FaPenToSquare: FaPenToSquare,
  FaBoxesStacked: FaBoxesStacked,
  FaLightbulb: FaLightbulb,
  FaGears: FaGears,
  FaChess: FaChess,
}

export const OutcomeSectionBlockComponent: React.FC<OutcomeSectionBlock> = ({
  badge,
  heading,
  cards,
  ctaCard,
}) => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Header */}
        {badge && (
          <span className="inline-block bg-gray-200 text-gray-800 text-sm font-medium px-4 py-1 rounded-full mb-4">
            {badge}
          </span>
        )}
        {heading && (
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12">
            {heading}
          </h2>
        )}

        {/* Cards Grid - Row 1: 4 cards */}
        {cards && cards.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {cards.slice(0, 4).map((card, i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                {card.icon && (() => {
                   const Icon = iconMap[card.icon as keyof typeof iconMap]
                   return Icon ? (
                   <div className="mb-4">
                     <Icon className="size-8 text-[#c8a23c]" />
                   </div>
                   ) : null
                })()}
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {card.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Cards Grid - Row 2: 2 cards + CTA */}
        {cards && cards.length > 4 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cards.slice(4, 6).map((card, i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                {card.icon && (
                  <div className="text-3xl mb-4">{card.icon}</div>
                )}
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {card.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}

            {/* CTA Card */}
            <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-8 flex flex-col justify-between min-h-[280px] overflow-hidden">
              {/* Diagonal stripes pattern */}
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
                {ctaCard?.heading || 'Call Us Today to Schedule to understand more!'}
              </h3>

              <div className="relative">
                {ctaCard?.ctaLink && (
                  <CMSLink
                    {...ctaCard.ctaLink}
                    className="inline-block bg-[#c8a23c] hover:bg-[#b8922c] text-white font-semibold px-6 py-3 rounded transition-colors"
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}