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
      maxRows: 8,
      fields: [
        {
          name: 'icon',
          type: 'select',
          label: 'Icon',
          options: [
            { label: 'Piggy Bank', value: 'FaPiggyBank' },
            { label: 'Pen / Edit', value: 'FaPenToSquare' },
            { label: 'Boxes / Inventory', value: 'FaBoxesStacked' },
            { label: 'Lightbulb / Ideas', value: 'FaLightbulb' },
            { label: 'Gears / Settings', value: 'FaGears' },
            { label: 'Chess / Strategy', value: 'FaChess' },
            { label: 'Wand / Magic', value: 'FaWandMagicSparkles' },
            { label: 'Box', value: 'FaBox' },
            { label: 'Money / Finance', value: 'FaMoneyBill' },
            { label: 'Accessibility', value: 'FaUniversalAccess' },
            { label:'Sheild', value:'FaShieldHalved'},
            { label:'Clock', value:'FaClock'},
            { label:'Gavel',value:'FaGavel'},
            { label:'BullsEye', value:'FaBullseye'},
            { label:'Chartline' , value:'FaChartLine'},
            { label:'Leaf', value:'FaLeaf'},
            { label:'Clipboard', value:'FaClipboard'},
            { label: 'Square Play', value: 'SquarePlayIcon' },
            { label:'Medal',value:'FaMedal'},
          ],
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
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'CTA Background Image',
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