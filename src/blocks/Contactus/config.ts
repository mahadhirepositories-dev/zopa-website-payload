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
      maxRows: 6,
      fields: [
        {
          name: 'icon',
          type: 'select',
          label: 'Icon',
          options: [
            { label: 'Career', value: 'FaBriefcase' },
            { label: 'Info', value: 'FaInfo' },
            { label: 'LinkedIn (Brand)', value: 'FaLinkedin' },
            { label: 'Address Book', value: 'FaAddressBook' },
            { label: 'Mail', value:'FiMail'},
            { label: 'Phone', value:'FiPhone'}
          ],
        },
        {
          name: 'label',
          type: 'text',
          label: 'Title',
        },
        {
          name: 'value',
          type: 'textarea',
          label: 'Value',
        },
        {
          name: 'linkedinUrl',
          type: 'text',
          label: 'LinkedIn URL',
          admin: {
            condition: (_data, siblingData) => siblingData?.icon === 'FaLinkedin',
            description: 'Only applicable when icon is LinkedIn',
          },
        },
      ],
    },
    {
      name: 'formHeading',
      type: 'text',
      label: 'Form Heading',
      defaultValue: 'Contact Us',
    },
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
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