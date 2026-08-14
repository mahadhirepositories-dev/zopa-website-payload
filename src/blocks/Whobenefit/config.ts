import type {Block} from 'payload'

export const WhoBenefitDetail: Block = {
  slug: 'whoBenefitDetail',
  interfaceName: 'WhoBenefitDetailBlock',
  labels: { singular: 'Who Benefit Detail', plural: 'Who Benefit Details' },
  fields: [
    {
      name: 'badge',
      type: 'text',
      label: 'Badge',
      defaultValue: 'Who Benefits from',
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      required: true,
      defaultValue: 'PROCUREMENT AS A SERVICE (PaaS)',
    },
    {
      name: 'sections',
      type: 'array',
      label: 'Content Sections',
      minRows: 1,
      maxRows: 4,
      fields: [
        { name: 'title', type: 'text', required: true, label: 'Section Title' },
        { name: 'description', type: 'textarea', required: true, label: 'Description' },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Right Side Image',
    },
  ],
}