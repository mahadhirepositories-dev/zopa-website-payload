import React from "react";
import type {ProductFlux as product_flux_block} from '@/payload-types'
import {CircleCheck,Sparkles } from 'lucide-react'
import { Media } from "@/components/Media";
import { CMSLink } from "@/components/Link";

const iconmap={
    circleCheck:CircleCheck,
    sparkles:Sparkles,
}

export const Product_Block:React.FC<product_flux_block>=(props)=>{
    const {heading,title,description,features,statcards}=props

    return(
        <section className="py-16 px-17 bg-white">
            <div className="text-center mb-12 flex justify-between">
                <div>
                <div className="ml-5 border border-border rounded-xs bg-[#dbac2b] w-23 h-6 flex items-center justify-center">
                <p className='text-xs text-black'>
                    {heading}
                </p>
                </div>
                <h2 className="mt-3 text-4xl text-black ml-5 mb-4">
                    {title}
                </h2>
                </div>
                <div className="mt-5">
                    <p className="text-sm text-left text-muted-foreground max-w-2xl mx-auto">
                        {description}
                    </p>
                </div>

            </div>
            {features && features.length>0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {features.map((f,i)=>{
                        const Icon=f.icon? iconmap[f.icon as keyof typeof iconmap]:Sparkles
                        return(
                            <div key={i} className="border border-border rounded-lg p-6 bg-white hover:bg-[#dbac2b] text-black flex flex-col min-h-64">
                                <div className="h-10 w-10 rounded-full flex items-center justify-center">
                                  {Icon && <Icon className="w-12 h-12  text-black"/>}                               
                                </div>
                                <h3 className="font-[400] text-2xl mt-auto font-sans">{f.title}</h3>

                            </div>
                        )
                    })}
                </div>
            )}

            {statcards && statcards.length>0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
                    {statcards.map((c,i)=>{
                        if(c.type==='image'){
                            return(
                                <div key={i} className="border border-border rounded-lg overflow-hidden bg-white h-64">
                                 {c.media && typeof c.media !== 'string' ?
                                <div className="p-6 h-full flex items-center justify-center overflow-hidden">
                                    <Media resource={c.media} className="max-h-full w-auto object-contain mb-8" />
                                 </div> :
                                 <div className="w-full h-full bg-white flex items-center justify-center text-muted-foreground">
                                   Image
                                </div>
                }
               </div>
                            )
                        }
                        if (c.type === 'cta') {
  return (
    <div key={i} className="relative rounded-lg overflow-hidden flex flex-col justify-end h-64 p-6">
      {/* was: backgroundImage + mix-blend-multiply */}
      <div className="absolute inset-0 bg-[#DBAC2B]" />
      <div
       className="absolute inset-0 opacity-20"
       style={{
       backgroundImage:
        'repeating-linear-gradient(90deg, rgba(0,0,0,0.15) 0 2px, transparent 2px 14px)',
       }}
       />
      <div className="relative z-10">
        {c.label && (
          <h3 className="font-[400] text-4xl text-black mb-5 leading-snug font-sans">{c.label}</h3>
        )}
        {c.ctaLink && (
          <CMSLink
            {...c.ctaLink}
            appearance="default"
            className="inline-flex items-center gap-2 bg-black text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-white hover:text-black transition-colors"
          />
          
        )}
      </div>
    </div>
  )
}
            const Icon = c.icon ? iconmap[c.icon as keyof typeof iconmap] : Sparkles
                        return (
                          <div key={i} className="border border-border rounded-lg p-6 bg-white h-64 hover:bg-[#dbac2b] flex flex-col">
                              <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4">
                            {Icon && <Icon className="w-12 h-12 text-black" />}
                          </div>
                           {c.stat && <p className="text-2xl font-[400] text-black mt-auto font-sans">{c.stat}</p>}
                           {c.label && <p className="text-sm text-muted-foreground">{c.label}</p>}
                         </div>
                        )
                    })}
                </div>
            )}
        </section>
    )
}