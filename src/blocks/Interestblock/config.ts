import type {Block} from 'payload'

export const InterestForm: Block = {
  slug: 'interestForm',
  interfaceName: 'InterestFormBlock',
  fields: [
     {
      name: 'anchorId',
      type: 'text',
      label: 'Anchor ID',
      defaultValue: 'interest',
      admin: {
        description:
          'Editors can scroll here from any link field by setting that link\'s "Anchor" to this value. Letters, numbers, hyphens only. Must be unique on the page.',
      },
      validate: (value: string | null | undefined) => {
        if (!value) return true
        return /^[a-zA-Z][a-zA-Z0-9_-]*$/.test(value)
          ? true
          : 'Use only letters, numbers, hyphens or underscores, starting with a letter.'
      },
    },
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
     name: 'contactPhoneLabel',
     type: 'text',
     label: 'Phone Label',
    },
    {
      name: 'contactPhone',
      type: 'text',
      label: 'Phone',
    },
    {
    name: 'contactEmailLabel',
    type: 'text',
    label: 'Email Label',
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