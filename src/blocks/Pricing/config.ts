import type {Block} from 'payload'
import {link} from '@/fields/link'

export const PricingComparison: Block = {
  slug: 'pricingComparison',
  interfaceName: 'PricingComparisonBlock',
  dbName: 'pricing_cards_link',
  fields: [
    {
      name: 'badge',
      type: 'text',
      label: 'Badge Text',
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'cards',
      type: 'array',
      labels: { singular: 'Card', plural: 'Cards' },
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Card Name',
        },
        {
          name: 'tagline',
          type: 'text',
          label: 'Tagline',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
        },
        {
          name: 'features',
          type: 'array',
          label: 'Features',
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