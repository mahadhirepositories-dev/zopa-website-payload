'use client'
import React from 'react'
import type { LifeAtZopaBlock } from '@/payload-types'
import { FaBuilding, FaHandshake, FaMedal } from 'react-icons/fa6'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FaBuilding, FaHandshake, FaMedal
}

export const LifeAtZopaBlockComponent: React.FC<LifeAtZopaBlock> = ({
  badge,
  heading,
  description,
  items,
}) => {
  return (
    <section className="px-10 py-16 bg-white">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Badge */}
        {badge && (
          <span className="inline-block px-3 py-1 bg-[#DCDCDC] text-[13px] border border-border rounded-xs text-black mb-8">
            {badge}
          </span>
        )}

        {/* Header: heading left, description right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {heading && (
            <h2 className="text-[30px] md:text-4xl font-[400] font-sans text-gray-900 leading-snug">
              {heading}
            </h2>
          )}
          {description && (
            <p className="text-sm md:text-base text-gray-800 leading-relaxed lg:mt-2">
              {description}
            </p>
          )}
        </div>

        {/* Cards */}
        {items && items.length > 0 && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {items.map((item, i) => {
              const Icon =
                item.icon && typeof item.icon === 'string' ? iconMap[item.icon] : null
              return (
                <div
                  key={i}
                  className="group border border-gray-200 rounded-lg p-8 hover:bg-[#dbac2b] transition-colors"
                >
                  {Icon && (
                    <div className="w-14 h-14 flex items-center justify-center mb-8">
                      <Icon className="size-9 text-[#dbac2b] group-hover:text-black" />
                    </div>
                  )}
                  <h3 className="text-xl font-[500] font-sans text-gray-900 mb-4">{item.title}</h3>
                  {item.description && (
                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                      {item.description}
                    </p>
                  )}
                  {item.points && item.points.length > 0 && (
                    <ul className="mt-4 space-y-3">
                      {item.points.map((pt, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-gray-800">
                          <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-black shrink-0" />
                          <span>{pt.point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}