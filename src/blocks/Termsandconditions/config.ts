import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

const headingBlock: Block = {
  slug: 'heading',
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
    },
  ],
}

const subHeadingBlock: Block = {
  slug: 'subHeading',
  fields: [
    {
      name: 'subHeading',
      type: 'text',
      label: 'Sub Heading',
    },
  ],
}

const pointsBlock: Block = {
  slug: 'points',
  fields: [
    {
      name: 'points',
      type: 'array',
      label: 'Points',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'point',
          type: 'text',
          label: 'Point',
        },
      ],
    },
  ],
}

const descriptionBlock: Block = {
  slug: 'description',
  fields: [
    {
      name: 'description',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: 'Description',
    },
  ],
}

export const TermsAndConditions: Block = {
  slug: 'termsAndConditions',
  interfaceName: 'TermsAndConditionsBlock',
  fields: [
    {
      name: 'fields',
      type: 'blocks',
      blocks: [headingBlock, subHeadingBlock, pointsBlock, descriptionBlock],
      labels: {
        singular: 'Field',
        plural: 'Fields',
      },
    },
  ],
  labels: {
    singular: 'Terms and Conditions Section',
    plural: 'Terms and Conditions Sections',
  },
}