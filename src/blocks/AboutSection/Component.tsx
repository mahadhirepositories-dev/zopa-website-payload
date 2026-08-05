import React from 'react';
import type { AboutSectionBlock } from '@/payload-types'
import RichText from '@/components/RichText'

export const AboutSectionBlockComponent: React.FC<AboutSectionBlock> = ({
  breadcrumb,
  heading,
  content,
}) => {
  return (
    <section className="py-16 px-10 bg-[#D3D3D3]">
      <div className="container mx-auto max-w-4xl">
        {breadcrumb && (
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
            {breadcrumb}
          </nav>
        )}
        <h1 className="text-[30px] font-[420] text-black md:text-5xl font-sans">{heading}</h1>
        <div className="mt-3 space-y-6 leading-relaxed text-muted-foreground max-w-xl">
          <RichText data={content} enableGutter={false} />
        </div>
      </div>
    </section>
  )
}