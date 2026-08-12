import type { Block } from 'payload'
import { link } from '@/fields/link'

export const OutcomeSection: Block = {
  slug: 'outcomeSection',
  interfaceName: 'OutcomeSectionBlock',
  labels: { singular: 'Outcome Section', plural: 'Outcome Sections' },
  dbName: 'outcome_cta_link',
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
      required: true,
    },
    {
      name: 'cards',
      type: 'array',
      label: 'Benefit Cards',
      minRows: 1,
      maxRows: 6,
      fields: [
        {
         name: 'icon',
         type: 'text',
         label: 'Icon Name',
         admin: {
             description: 'Options: FaPiggyBank, FaPenToSquare, FaBoxesStacked, FaLightbulb, FaGears, FaChess',
         },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Card Title',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Card Description',
        },
      ],
    },
    {
      name: 'ctaCard',
      type: 'group',
      label: 'CTA Card',
      fields: [
        {
          name: 'heading',
          type: 'text',
          label: 'CTA Heading',
          defaultValue: 'Call Us Today to Schedule to understand more!',
        },
        link({
          appearances: ['default'],
          overrides: {
            name: 'ctaLink',
            label: 'CTA Button Link',
          },
        }),
      ],
    },
  ],
}