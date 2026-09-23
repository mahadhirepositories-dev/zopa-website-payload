import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  OrderedListFeature,
  UnorderedListFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const TermsAndConditions: Block = {
  slug: 'termsAndConditions',
  interfaceName: 'TermsAndConditionsBlock',
  fields: [
    {
      name: 'content',
      type: 'richText',
      label: 'Terms and Conditions Content',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            OrderedListFeature(),
            UnorderedListFeature(),
            HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
    },
  ],
  labels: {
    singular: 'Terms and Conditions Section',
    plural: 'Terms and Conditions Sections',
  },
}