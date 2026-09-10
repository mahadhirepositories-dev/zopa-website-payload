import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { link } from '@/fields/link'

export const AboutUs: Block = {
  slug: 'aboutUs',
  interfaceName: 'AboutUsBlock',
  labels: { singular: 'About Us', plural: 'About Us Sections' },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Image',
    },
    {
      name: 'label',
      type: 'text',
      label: 'Label (e.g. Who We Are)',
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Content',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
    },
    {
      name: 'features',
      type: 'array',
      label: 'Feature List (right column)',
      fields: [
        {
          name: 'feature',
          type: 'text',
        },
      ],
    },
    {
      name: 'cardTitle',
      type: 'text',
      label: 'Floating Card Title',
    },
    {
      name: 'cardPoints',
      type: 'array',
      label: 'Floating Card Points',
      fields: [
        {
          name: 'point',
          type: 'text',
        },
      ],
    },
    link({
      appearances: ['default', 'outline'],
      overrides: {
        name: 'ctaLink',
        label: 'CTA Button',
      },
    }),
  ],
}