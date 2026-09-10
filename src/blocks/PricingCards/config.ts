import type { Block } from "payload";
import {link} from '@/fields/link'

export const PricingCards: Block = {
  slug: 'pricingCards',
  interfaceName: 'PricingCardsBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Section Heading',
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Section Subtitle',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Section Description',
    },
    {
      name: 'cards',
      type: 'array',
      maxRows: 4,
      labels: { singular: 'Card', plural: 'Cards' },
      fields: [
        {
          name: 'cardType',
          type: 'select',
          defaultValue: 'pricing',
          options: [
            { label: 'Pricing (features list)', value: 'pricing' },
            { label: 'Services (background image)', value: 'services' },
          ],
          label: 'Card Style',
        },
        {
          name: 'name',
          type: 'text',
          label: 'Card Name',
        },
        {
          name: 'tagline',
          type: 'text',
          label: 'Card Tagline',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Card Description',
           admin: {
            condition: (_, siblingData) => siblingData?.cardType !== 'services',
          },
        },
        {
          name:'backgroundImage',
          type: 'upload',
          relationTo:'media',
          label:'Background Image',
          admin:{
            condition:(_,siblingData)=>siblingData?.cardType==='services',
          },
        },
        {
          name: 'features',
          type: 'array',
          label: 'Feature List',
          admin:{
            condition:(_,siblingData)=>siblingData?.cardType==='pricing',
          },
          fields: [
            {
              name: 'feature',
              type: 'text',
            },
          ],
        },
        link({
          appearances: ['default', 'outline'],
          overrides: {
            name: 'ctaLink',
            label: 'CTA Button',
          },
        }),
      ],
    },
  ],
}