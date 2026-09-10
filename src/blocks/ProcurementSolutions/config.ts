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
      label: 'Right Description (press Enter for a new paragraph)',
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
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