import React from 'react'
import type { ServicesSectionBlock } from '@/payload-types'

export const ServicesSectionBlockComponent: React.FC<ServicesSectionBlock> = ({ services }) => {
  return (
    <section className="py-0 px-10 bg-white border-b border-gray-600">
      <div className="container mx-auto max-w-6xl">
        {services && services.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((item, i) => (
              <div
                key={i}
                className="border-b-2 border-transparent p-6 text-center bg-white hover:border-black  transition-all"
              >
                <h3 className="text-base font-[350] text-black">{item.title}</h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}