'use client'
import React from 'react'
import type { WhoCanBenefitBlock } from '@/payload-types'

export const WhoCanBenefitBlockComponent: React.FC<WhoCanBenefitBlock> = ({ label, items }) => (
  <div className="py-7 px-7 bg-gradient-to-r from-[#c8a23c] via-[#d4b85a] to-[#f0e6c0] py-4">
    <div className="container flex items-center gap-8">
      <span className="font-[400] text-14">{label}</span>
      <div className='ml-auto flex items-center gap-10'>
      {items?.map((item, i) => (
        <span key={i} className="text-14 font-[400]">{item.text}</span>
      ))}
      </div>
    </div>
  </div>
)