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
                            <div key={i} className="border border-border rounded-lg p-6 bg-white hover:bg-[#dbac2b] text-black flex flex-col min-h-72">
                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                  {Icon && <Icon className="w-12 h-12  text-black"/>}                               
                                </div>
                                <h3 className="font-semibold text-2xl mt-auto">{f.title}</h3>

                            </div>
                        )
                    })}
                </div>
            )}

            {statcards && statcards.length>0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {statcards.map((c,i)=>{
                        if(c.type==='image'){
                            return(
                                <div key={i} className="border border-border rounded-lg overflow-hidden bg-white">
                                    {c.media && typeof c.media!=='string'?
                                    <div className="p-8"><Media resource={c.media} className="w-full object-cover"/></div>:
                                    <div className="w-full h-48 bg-white flex items-center justify-center text-muted-foreground">
                                         Image
                                    </div>                                   
                                    }
                                </div>
                            )
                        }
                        if (c.type === 'cta') {
                              return (
                                <div key={i} className="border border-border rounded-lg p-6 bg-white flex flex-col items-center justify-center text-center">
                                  {c.label && <h3 className="font-semibold text-lg mb-4">{c.label}</h3>}
                                  {c.ctaLink && (
                                    <div className="inline-flex items-center gap-2">
                                      <CMSLink {...c.ctaLink} appearance="default" className="text-black"/>
                                      <span aria-hidden="true">&rarr;</span>
                                    </div>
                                  )}
                                </div>
                              )
                            }
            const Icon = c.icon ? iconmap[c.icon as keyof typeof iconmap] : Sparkles
                        return (
                          <div key={i} className="border border-border rounded-lg p-6 bg-white hover:bg-[#dbac2b] flex flex-col">
                              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                            {Icon && <Icon className="w-12 h-12 text-black" />}
                          </div>
                           {c.stat && <p className="text-2xl font-bold text-black mt-auto">{c.stat}</p>}
                           {c.label && <p className="text-sm text-muted-foreground">{c.label}</p>}
                         </div>
                        )
                    })}
                </div>
            )}
        </section>
    )
}