import type { Block } from 'payload'

export const LifeAtZopa: Block = {
  slug: 'lifeAtZopa',
  interfaceName: 'LifeAtZopaBlock',
  labels: { singular: 'Life at ZOPA', plural: 'Life at ZOPA Sections' },
  fields: [
    {
      name: 'badge',
      type: 'text',
      label: 'Badge',
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description (right side)',
    },
    {
      name: 'items',
      type: 'array',
      label: 'Cards',
      maxRows: 6,
      fields: [
        {
          name: 'icon',
          type: 'select',
          label: 'Icon',
          options: [
            { label: 'Building', value: 'FaBuilding' },
            { label: 'Handshake', value: 'FaHandshake' },
            { label: 'Medal', value: 'FaMedal' },
            
          ],
        },
        {
          name: 'title',
          type: 'text',
          label: 'Card Title',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Card Description',
        },
        {
          name: 'points',
          type: 'array',
          label: 'Bullet Points (optional)',
          fields: [
            {
              name: 'point',
              type: 'text',
            },
          ],
        },
      ],
    },
  ],
}