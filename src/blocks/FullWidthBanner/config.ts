import type { Block } from 'payload'
import {linkGroup} from '@/fields/linkGroup'

export const FullWidthBanner: Block = {
  slug: 'fullWidthBanner',
  interfaceName: 'FullWidthBannerBlock',
  fields: [
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    linkGroup({
      appearances: ['default', 'outline'],
      overrides: {
        maxRows: 1,
      },
    }),
  ],
  labels: { plural: 'Full Width Banners', singular: 'Full Width Banner' },
}
