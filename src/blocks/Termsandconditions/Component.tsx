import React from 'react'
import RichText from '@/components/RichText'

import type { TermsAndConditionsBlock as TermsAndConditionsBlockProps } from '@/payload-types'

export const TermsAndConditionsBlock: React.FC<TermsAndConditionsBlockProps> = (props) => {
  const { fields } = props

  return (
    <section className="px-20">
      <div className="container py-10 ">
        {fields?.map((field, index) => {
          if (field.blockType === 'heading') {
            return (
              <h2 key={index} className="text-3xl font-bold text-black mb-4">
                {field.heading}
              </h2>
            )
          }

          if (field.blockType === 'subHeading') {
            return (
              <h3 key={index} className="text-xl font-semibold text-black mb-4">
                {field.subHeading}
              </h3>
            )
          }

          if (field.blockType === 'points') {
            return (
              <ul key={index} className="list-disc list-inside text-black mb-6 space-y-2">
                {field.points?.map((item, i) => (
                  <li key={i}>{item.point}</li>
                ))}
              </ul>
            )
          }

          if (field.blockType === 'description') {
            return field.description ? (
              <div key={index} className="text-gray-800 mb-6">
                <RichText data={field.description} enableGutter={false} enableProse={false} />
              </div>
            ) : null
          }

          return null
        })}
      </div>
    </section>
  )
}