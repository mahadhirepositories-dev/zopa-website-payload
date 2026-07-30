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
      minRows: 1,
      maxRows: 4,
      labels: { singular: 'Card', plural: 'Cards' },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
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
        },
        {
          name: 'features',
          type: 'array',
          label: 'Feature List',
          fields: [
            {
              name: 'feature',
              type: 'text',
              required: true,
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