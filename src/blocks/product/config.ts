import type { Block } from "payload";
import { link } from "@/fields/link";

export const Product:Block = {
    slug:'product',
    interfaceName:'Product_flux',
    fields:[
        {
            name:'heading',
            type:'text',
            required:true,
        },
        {
            name:'title',
            type:'text',
            required:true,
        },
        {
            name:'description',
            type:'textarea',
            required:true,
        },
        {
            name:'features',
            type:'array',
            minRows:0,
            maxRows:4,
            label:"Feature cards",
            fields:[
                {
                    name:'icon',
                    type:'select',
                    options:[
                        { label: 'CircleCheck', value: 'circleCheck' },
                        { label: 'Sparkles', value: 'sparkles' },
                    ],
                },
                {
                    name:'title',
                    type:'text',
                    required:true,
                },
                {
                    name:'description',
                    type:'textarea',
                },
            ],
        
                
            
        },
        {
            name:'statcards',
            type:'array',
            label:'Stats cards',
            minRows:0,
            maxRows:4,
            fields:[
                {
                    name:'icon',
                    type:'select',
                    options:[
                        { label: 'CircleCheck', value: 'circleCheck' },
                        { label: 'Sparkles', value: 'sparkles' },
                    ],
                },
                {
                    name:'stat',
                    type:'text',                    
                },
                {
                    name:'label',
                    type:'text',
                },
                {
                    name:'type',
                    type:'select',
                    options:[
                        {
                            label:'Stat',
                            value:'stat'
                        },
                        {
                            label:'Image',
                            value:'image',
                        },
                        {
                            label:'CTA',
                            value:'cta',
                        },

                    ],
                },
                {
                    name:'media',
                    type:'upload',
                    relationTo:'media',
                    admin:{condition:(_,s)=>s?.type==="image"},
                },
                link({
                    appearances:['default','outline'],
                    overrides:{
                        name:'ctaLink',
                        label:'CTAlink',
                        admin:{condition:(_,s)=>s?.type==='cta',},
                    },
                }),
                {
                 name: 'backgroundImage',
                 type: 'upload',
                 relationTo: 'media',
                 label: 'Background Image',
                 admin: { condition: (_, s) => s?.type === 'cta' },
                },

            ],
            

        },
    ],
    labels:{plural:'Products',singular:'Product'}

}