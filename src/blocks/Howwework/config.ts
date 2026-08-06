import type {Block} from 'payload'

export const HowWeWork: Block = {
  slug: 'howWeWork',
  interfaceName: 'HowWeWorkBlock',
  labels: { singular: 'How We Work', plural: 'How We Work Sections' },
  fields: [
    {
      name: 'badge',
      type: 'text',
      label: 'Badge',
    },
    {
      name: 'heading',
      type: 'textarea',
      required: true,
      label: 'Heading',
      admin: {
        description:
          'One line per row, e.g. Transparent. / Collaborative. / Results-Driven.',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'steps',
      type: 'array',
      label: 'Process Steps',
      minRows: 1,
      maxRows: 8,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Step Title',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Step Description',
        },
      ],
    },
  ],
}