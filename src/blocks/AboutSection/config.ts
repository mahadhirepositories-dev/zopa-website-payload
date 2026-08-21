import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const AboutSection: Block = {
  slug: 'aboutSection',
  interfaceName: 'AboutSectionBlock',
  fields: [
    {
      name: 'breadcrumb',
      type: 'text',
      label: 'Breadcrumb',
    },
    {
      name: 'heading',
      type: 'text',
      required: false,
      label: 'Heading',
    },
    {
      name: 'content',
      type: 'textarea',
      required: false,
      label: 'Content',
    },
  ],
  labels: { singular: 'About Section', plural: 'About Sections' },
}