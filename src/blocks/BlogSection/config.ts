import type {Block} from 'payload'
import {link} from '@/fields/link'

export const BlogSection: Block = {
  slug: 'blogSection',
  interfaceName: 'BlogSectionBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Intro Title',
    },
    {
      name: 'limit',
      type: 'number',
      label: 'Number of Posts',
      defaultValue: 2,
      admin: { step: 1 },
    },
    link({
      appearances: ['default', 'outline'],
      overrides: {
        name: 'viewMoreLink',
        label: 'View More Link',
      },
    }),
  ],
  labels: { plural: 'Blog Sections', singular: 'Blog Section' },
}
