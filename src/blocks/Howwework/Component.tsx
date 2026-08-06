import React from 'react';
import type { HowWeWorkBlock } from '@/payload-types'

export const HowWeWorkBlockComponent: React.FC<HowWeWorkBlock> = ({
  badge,
  heading,
  description,
  steps,
}) => {
  return (
    <section className="py-35 px-10 bg-white">
      <div className="container mx-auto max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            {badge && (
              <div className="mb-5 inline-flex h-6 items-center justify-center rounded-xs bg-[#DCDCDC] border border-border px-3">
                <p className="text-xs text-black">{badge}</p>
              </div>
            )}
            {heading && (
              <h2 className="text-4xl md:text-5xl font-[400] text-black whitespace-pre-line font-sans">
                {heading}
              </h2>
            )}
            {description && (
              <p className="mt-6 text-sm text-muted-foreground leading-relaxed w-[350px] whitespace-pre-line">
                {description}
              </p>
            )}
          </div>

          {steps && steps.length > 0 && (
            <div className="space-y-0">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="border border-border rounded-lg p-6"
                >
                  <div className="flex items-start gap-5">
                    <span className="text-3xl md:text-[50px] font-[300] text-black">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="ml-10">
                      <h3 className="text-xl font-medium text-black font-sans">
                        {step.title}
                      </h3>
                      {step.description && (
                        <p className="mt-2 text-[11px] text-muted-foreground w-[300px]">
                          {step.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}