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
          name: 'sectionId',
          type: 'text',
          label: 'Anchor ID',
          admin: {
            description:
              'Must match the Anchor ID on the corresponding Services Section item.',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Description',
        },
        {
          name: 'subHeading',
          type: 'text',
          label: 'Sub Heading',
        },
        {
          name: 'displayType',
          type: 'select',
          defaultValue: 'item',
          label: 'Display Type',
          options: [
            { label: 'Simple Items', value: 'item' },
            { label: 'Title + Description Features', value: 'feature' },
          ],
        },
        {
          name: 'items',
          type: 'array',
          label: 'Items',
          admin: {
            condition: (_, siblingData) => siblingData?.displayType === 'item',
          },
          fields: [
            { name: 'item', type: 'text', required: true, label: 'Item' },
          ],
        },
        {
          name: 'features',
          type: 'array',
          label: 'Features',
          admin: {
            condition: (_, siblingData) => siblingData?.displayType === 'feature',
          },
          fields: [
            { name: 'title', type: 'text', required: true, label: 'Title' },
            { name: 'description', type: 'textarea', required: true, label: 'Description' },
          ],
        },
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          required: false,
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