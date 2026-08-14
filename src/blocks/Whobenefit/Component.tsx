'use client'
import React from "react"
import type { WhoBenefitDetailBlock } from '@/payload-types'
import { Media } from '@/components/Media'

export const WhoBenefitDetailBlockComponent: React.FC<WhoBenefitDetailBlock> = ({
  badge,
  heading,
  sections,
  image,
}) => (
 <div className="px-4">
  <section className="py-16 bg-[#DCDCDC] rounded-md">
    <div className="container mx-auto max-w-7xl px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div>
          {badge && (
            <span className="inline-block bg-white text-gray-800 text-sm font-medium px-4 py-1 rounded-xs mb-4">
              {badge}
            </span>
          )}
          {heading && (
            <h2 className="text-3xl md:text-[50px] font-[400] text-gray-900 mb-8 font-sans">
              {heading}
            </h2>
          )}
          {sections?.map((section, i) => (
            <div key={i} className="mb-6 border-l-4 border-[#dbac2b] pl-4">
              <h3 className="text-[25px] font-[400] text-gray-900 mb-2 font-sans">
                {section.title}
              </h3>
              <p className="text-gray-600 text-[17px] leading-relaxed">
                {section.description}
              </p>
            </div>
          ))}
        </div>

        {/* Right Image */}
        <div className="rounded-md overflow-hidden">
          {image && typeof image === 'object' && (
           <Media resource={image} className="w-auto h-auto object-cover overflow-hidden" />
           )}
        </div>
      </div>
    </div>
  </section>
  </div>
)