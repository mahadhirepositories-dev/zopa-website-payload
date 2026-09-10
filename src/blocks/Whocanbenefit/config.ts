import type {Block} from 'payload'

export const WhoCanBenefit: Block = {
  slug: 'whoCanBenefit',
  interfaceName: 'WhoCanBenefitBlock',
  fields: [
    {
      name: 'label',
      type: 'text',
      defaultValue: 'Who can benefit:',
    },
    {
      name: 'items',
      type: 'array',
      fields: [{ name: 'text', type: 'text' }],
    },
  ],
}