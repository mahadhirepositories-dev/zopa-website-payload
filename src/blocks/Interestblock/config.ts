import type {Block} from 'payload'

export const InterestForm: Block = {
  slug: 'interestForm',
  interfaceName: 'InterestFormBlock',
  fields: [
    {
      name: 'label',
      type: 'text',
      label: 'Label',
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image',
    },
    {
      name: 'overlayHeading',
      type: 'text',
      label: 'Overlay Heading',
    },
    {
      name: 'overlayDescription',
      type: 'textarea',
      label: 'Overlay Description',
    },
    {
      name: 'contactPhone',
      type: 'text',
      label: 'Phone',
    },
    {
      name: 'contactEmail',
      type: 'email',
      label: 'Email',
    },
    {
      name: 'formHeading',
      type: 'text',
      label: 'Form Heading',
    },
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      label: 'Form',
    },
    {
      name: 'formLogo',
      type: 'upload',
      relationTo: 'media',
      label: 'Form Logo',
    }
  ],
  labels: {
    singular: 'Interest Form',
    plural: 'Interest Forms',
  },
}