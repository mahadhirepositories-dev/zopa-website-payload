import type { Block } from 'payload'

export const ContactInfo: Block = {
  slug: 'contactInfo',
  interfaceName: 'ContactInfoBlock',
  fields: [
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: 'icon',
          type: 'select',
          label: 'Icon',
          required: true,
          options: [
            { label: 'Phone', value: 'Phone' },
            { label: 'WhatsApp', value: 'FaWhatsapp' },
            { label: 'Email', value: 'Mail' },
          ],
        },
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          required: true,
        },
        {
          name: 'value',
          type: 'text',
          label: 'Value',
          required: true,
        },
        {
          name: 'link',
          type: 'text',
          label: 'Custom Link (optional)',
          admin: {
            description: 'Leave empty to auto-generate from value (tel:, mailto:, https://wa.me/)',
          },
        },
      ],
    },
  ],
  labels: {
    singular: 'Contact Info',
    plural: 'Contact Infos',
  },
}