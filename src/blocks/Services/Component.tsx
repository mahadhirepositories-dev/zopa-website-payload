import React from 'react';
import type { ServiceDetailSectionBlock } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/utilities/ui'

export const ServiceDetailSectionBlockComponent: React.FC<ServiceDetailSectionBlock> = ({
  services,
}) => {
  return (
    <section className="py-16 px-10 bg-white">
      <div className="container mx-auto max-w-6xl space-y-20">
        {services && services.length > 0 &&
          services.map((service, index) => {
            const imageRight = service.layout === 'imageRight'
            return (
               <div
                key={index}
                id={service.sectionId || undefined}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center scroll-mt-24"
              > 
                {/* Image */}
                <div
                  className={cn(
                    'relative h-[400px] lg:h-[550px] w-full overflow-hidden rounded-lg',
                    imageRight && 'lg:order-2',
                  )}
                >
                  {service.media && typeof service.media === 'object' && (
                    <Media
                      resource={service.media}
                      fill
                      priority={index === 0}
                      imgClassName="h-full w-full object-cover"
                    />
                  )}
                </div>

                {/* Content */}
                <div className={cn(imageRight?'lg:order-1 mr-10 w-[400px]':'lg:order-2 ml-10 w-[400px]')}> 
                  {service.badge && (
                    <div className="mb-5 inline-flex h-6 items-center justify-center rounded-xs bg-[#DCDCDC] border border-border px-3">
                      <p className="text-xs text-black">{service.badge}</p>
                    </div>
                  )}
                  {service.title && (
                    <h2 className="text-4xl md:text-[50px] font-[400] text-black font-sans">
                      {service.title}
                    </h2>
                  )}
                  {service.description && (
                    <p className="mt-6 text-sm text-gray-800 leading-relaxed">
                      {service.description}
                    </p>
                  )}

                  {service.subHeading && (
                    <h3 className="mt-5 text-2xl font-[400] font-sans text-black">
                      {service.subHeading}
                    </h3>
                  )}

                  {/* Simple Items with rounded bullets */}
                  {service.displayType === 'item' && service.items && service.items.length > 0 && (
                    <ul className="mt-4 space-y-3 list-disc list-inside">
                      {service.items.map((f, i) => (
                        <li key={i} className="text-sm text-black marker:text-black">
                          <ArrowRight className="inline-block w-4 h-4 mr-2" />
                          {f.item}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Title + Description Features with rounded bullets */}
                  {service.displayType === 'feature' && service.features && service.features.length > 0 && (
                    <ul className="mt-6 space-y-4 list-disc list-inside">
                      {service.features.map((f, i) => (
                        <li key={i} className="text-sm text-black marker:text-black">
                          <strong>{f.title}:</strong> {f.description}
                        </li>
                      ))}
                    </ul>
                  )}

                  {service.ctaLink && (
                    <div className="mt-10">
                      <CMSLink
                        {...service.ctaLink}
                        className="group inline-flex items-center gap-2 bg-[#dbac2b] text-black hover:bg-black hover:text-white px-6 py-3 rounded-md font-medium"
                      >
                        <ArrowRight className="h-5 w-5 group-hover:text-white" />
                      </CMSLink>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
      </div>
    </section>
  )
}