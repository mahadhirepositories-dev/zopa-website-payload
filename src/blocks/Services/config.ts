import type { Block } from 'payload'
import { link } from '@/fields/link'

export const ServiceDetailSection: Block = {
  slug: 'serviceDetailSection',
  interfaceName: 'ServiceDetailSectionBlock',
  labels: { singular: 'Service Details Section', plural: 'Service Details Sections' },
  fields: [
    {
      name: 'services',
      type: 'array',
      dbName: 'svc',
      label: 'Services',
      minRows: 1,
      maxRows: 4,
      fields: [
        {
          name: 'layout',
          type: 'select',
          defaultValue: 'imageLeft',
          label: 'Layout',
          options: [
            { label: 'Image Left, Content Right', value: 'imageLeft' },
            { label: 'Content Left, Image Right', value: 'imageRight' },
          ],
        },
        {
          name: 'badge',
          type: 'text',
          label: 'Badge',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Title',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Description',
        },
        {
          name: 'features',
          type: 'array',
          label: 'Checklist Items',
          fields: [
            { name: 'item', type: 'text', required: true },
          ],
        },
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Image',
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