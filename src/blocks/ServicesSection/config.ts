import type { Block } from 'payload'
import { link } from '@/fields/link'

export const ServicesSection: Block = {
  slug: 'servicesSection',
  interfaceName: 'ServicesSectionBlock',
  labels: { singular: 'Services Section', plural: 'Services Sections' },
   fields: [
    {
      name: 'services',
      type: 'array',
      label: 'Service Titles',
      maxRows: 4,
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Service Title',
        },
        link({
          disableLabel: true,
          appearances: false,
        }),
      ],
    },
  ],
}