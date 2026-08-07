import React from 'react'
import type { InterestFormBlock } from '@/payload-types'
import { Media } from '@/components/Media'
import { FormBlock } from '@/blocks/Form/Component'
import { Phone, Mail } from 'lucide-react'

export const InterestFormBlockComponent: React.FC<InterestFormBlock> = (props) => {
  const {
    label,
    heading,
    description,
    backgroundImage,
    overlayHeading,
    overlayDescription,
    contactPhone,
    contactEmail,
    formHeading,
    form,
  } = props

  return (
    <section className="py-40 bg-white">
      <div className="container">
        {/* Top: Label + Heading + Description */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="flex flex-col gap-4">
            {label && (
              <span className="inline-block self-start px-3 py-1 bg-[#DCDCDC] text-sm border border-border rounded-xs text-black">
                {label}
              </span>
            )}
            {heading && (
              <h2 className="text-4xl md:text-[40px] font-[400] w-[80px] leading-tight text-black font-sans whitespace-pre-line">
                {heading}
              </h2>
            )}
          </div>
          <div>
            {description && (
              <p className="text-gray-800 text-[13px] leading-relaxed">{description}</p>
            )}
          </div>
        </div>

        {/* Full width image with overlay cards */}
        <div className="relative rounded-lg shadow-lg">
          {/* Background image - full width */}
          <div className="relative h-[600px]">
            {backgroundImage && typeof backgroundImage === 'object' ? (
              <Media
                resource={backgroundImage}
                className="absolute inset-0 w-full h-full"
                imgClassName="object-cover w-full h-full"
              />
            ) : (
              <div className="absolute inset-0 bg-gray-300" />
            )}
          </div>

          {/* Two overlay cards */}
          <div>
            {/* Left: Contact Card */}
            <div className="bg-white/30 rounded-lg shadow-lg p-8 backdrop-blur-lg absolute z-10 top-120 left-0">
              {overlayHeading && (
                <h3 className="text-xl font-semibold text-white mb-3">{overlayHeading}</h3>
              )}
              {overlayDescription && (
                <p className="text-white text-sm leading-relaxed mb-6">{overlayDescription}</p>
              )}

              {contactPhone && (
                <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-200">
                  <div className="w-10 h-10 bg-gray-100 rounded-sm flex items-center justify-center">
                    <Phone className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Call us at:</p>
                    <p className="font-semibold text-black">{contactPhone}</p>
                  </div>
                </div>
              )}
              {contactEmail && (
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-sm flex items-center justify-center">
                    <Mail className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Mail us at:</p>
                    <p className="font-semibold text-black">{contactEmail}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Form Card */}
            <div className="absolute z-10 -top-15 right-0">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden ">
              <div className="bg-[#2a2a2a] px-8 py-6 flex items-center gap-4">
                <div className="text-white">
                  <span className="text-lg font-bold">ZOPA</span>
                  <span className="text-xs block text-gray-400">Procure Efficiently</span>
                </div>
                <div className="w-px h-8 bg-gray-500" />
                {formHeading && (
                  <h3 className="text-white text-lg font-semibold">{formHeading}</h3>
                )}
              </div>
              {form && typeof form === 'object' && (
                <div className="p-8">
                  <FormBlock enableIntro={false} form={form as any} />
                </div>
              )}
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}