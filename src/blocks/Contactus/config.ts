import type { Block } from 'payload'

export const ContactUs: Block = {
  slug: 'contactUs',
  interfaceName: 'ContactUsBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      defaultValue: 'Contact Us',
    },
    {
      name: 'subheading',
      type: 'text',
      label: 'Subheading',
      defaultValue: 'Our Experts Always Ready to Work With You',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      defaultValue: 'Ask about general information. Please send us a message.',
    },
    {
      name: 'contactCards',
      type: 'array',
      label: 'Contact Cards',
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: 'icon',
          type: 'select',
          label: 'Icon',
          required: true,
          options: [
              { label: 'Career', value: 'FaBriefcase' },
              { label: 'Info', value: 'FaInfo' },
              { label: 'LinkedIn (Brand)', value: 'FaLinkedin' },
              { label: 'Address Book', value: 'FaAddressBook' },
            ],
        },
        {
          name: 'label',
          type: 'text',
          label: 'Title',
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
        },
      ],
    },
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
      label: 'Contact Form',
    },
    {
      name: 'formLogo',
      type: 'upload',
      relationTo: 'media',
      label: 'Form Logo',
    },
  ],
  labels: {
    singular: 'Contact Us',
    plural: 'Contact Us',
  },
}