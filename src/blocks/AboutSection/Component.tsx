import React from 'react';
import type { AboutSectionBlock } from '@/payload-types'
import RichText from '@/components/RichText'
import Link from 'next/link';

export const AboutSectionBlockComponent: React.FC<AboutSectionBlock> = ({
  breadcrumb,
  heading,
  content,
}) => {
  return (
    <section className="py-16 px-10 bg-[#D3D3D3]">
      <div className="container mx-auto max-w-4xl">
        {breadcrumb && (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-600">
      <Link href="/" className="text-black hover:underline">
       Home
      </Link>
      <span className="text-black">{breadcrumb}</span>
       <div className="border-t border-gray-700 mt-6"/>
    </nav>
    
)}
        {/* <div className="border-t border-gray-700"/> */}
        <h1 className="mt-5 text-[30px] font-[420] text-black md:text-5xl font-sans">{heading}</h1>
        {content && (
          <p className="mt-3 text-gray-800 max-w-xl text-[13px] whitespace-pre-line">
            {content}
          </p>
        )}
      </div>
    </section>
  )
}