import type { Block } from 'payload'

export const ServicesSection: Block = {
  slug: 'servicesSection',
  interfaceName: 'ServicesSectionBlock',
  labels: { singular: 'Services Section', plural: 'Services Sections' },
  fields: [
    {
      name: 'services',
      type: 'array',
      label: 'Service Titles',
      minRows: 1,
      maxRows: 4,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Service Title',
        },
      ],
    },
  ],
}