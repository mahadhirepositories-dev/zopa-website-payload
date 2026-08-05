import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'ctaHeading',
      type: 'text',
      label: 'CTA Heading',
      defaultValue: 'Ready to Save 20% on Procurement Costs?',
    },
    {
      name: 'ctaDescription',
      type: 'textarea',
      label: 'CTA Description',
      defaultValue:
        'Speak with our procurement specialists to explore tailored strategies that drive measurable savings and operational excellence. Book your session today and start benefiting from personalized procurement insights.',
    },
    link({
      appearances: false,
      overrides: {
        name: 'ctaButton',
        label: 'CTA Button',
      },
    }),
    {
      name: 'ctaLogo',
      type: 'upload',
      relationTo: 'media',
      label: 'CTA Logo',
    },
    {
      name: 'columns',
      type: 'array',
      label: 'Footer Columns',
      maxRows: 4,
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Column Title',
          required: true,
        },
        {
          name: 'links',
          type: 'array',
          label: 'Links',
          maxRows: 6,
          fields: [
          link({
              appearances: false,
            }),
          ],
        },
      ],
    },
    {
      name: 'contactAddress',
      type: 'textarea',
      label: 'Address',
      defaultValue: 'Hyderabad,\nIndia',
    },
    {
      name: 'contactPhone',
      type: 'text',
      label: 'Phone',
      defaultValue: '+917075452105',
    },
    {
      name: 'contactEmail',
      type: 'email',
      label: 'Email',
      defaultValue: 'grow@zopapro.com',
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Social Links',
      maxRows: 5,
      fields: [
        {
          name: 'platform',
          type: 'text',
          label: 'Platform (e.g. LinkedIn, Facebook, Instagram)',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          label: 'URL',
          required: true,
        },
      ],
    },
    {
      name: 'copyright',
      type: 'text',
      label: 'Copyright Text',
      defaultValue: '2026 © ZOPA. All rights reserved.',
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}