import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: 'Type',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'High Impact',
          value: 'highImpact',
        },
        {
          label: 'Medium Impact',
          value: 'mediumImpact',
        },
        {
          label: 'Low Impact',
          value: 'lowImpact',
        },
      ],
      required: false,
    },
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
    },
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: 'media',
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'mediumImpact','fullwidth'].includes(type),
      },
      relationTo: 'media',
      required: true,
    },
    {
      name:'logo',
      type:'upload',
      relationTo:'media',
      admin:{
        condition:(_,{type}={})=>type==='fullwidth',
      },
    },
    {
      name:'heading',
      type:'text',
      admin:{
        condition:(_,{type}={})=>type==='fullwidth',
      },
    },
    {
      name:'stats',
      type:'array',
      admin:{
        condition:(_,{type}={})=>type==='highImpact',
        initCollapsed:true
      },
      fields:[
        {
          name:'value',
          type:'text',
          required:true,
        },
        {
          name:'label',
          type:'text',
          required:true,
        },
      ],
      maxRows:4,
      label:'stats',
    },
  ],
  label: false,
}
