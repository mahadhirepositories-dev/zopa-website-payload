import type {Block} from 'payload'
import {link} from '@/fields/link'

export const ProcurementSolutions: Block = {
  slug: 'procurementSolutions',
  interfaceName: 'ProcurementSolutionsBlock',
  labels: { singular: 'Procurement Solutions', plural: 'Procurement Solutions Sections' },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Left Title',
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Left Subtitle',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Right Description (press Enter for a new paragraph)',
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Hero Procurement Image',
    },
    link({
      appearances: ['default', 'outline'],
      overrides: {
        name: 'ctaLink',
        label: 'CTA Button',
      },
    }),
  ],
}