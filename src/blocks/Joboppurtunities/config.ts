import type { Block } from 'payload'
import { link } from '@/fields/link'

export const JobOpportunities: Block = {
  slug: 'jobOpportunities',
  interfaceName: 'JobOpportunitiesBlock',
  labels: { singular: 'Job Opportunities', plural: 'Job Opportunities Sections' },
  dbName: 'job_ops',
  fields: [
    {
      name: 'badge',
      type: 'text',
      label: 'Badge',
      defaultValue: 'Job Opportunities',
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      required: true,
      defaultValue: 'Current Openings',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'jobs',
      type: 'array',
      label: 'Openings',
      minRows: 1,
      fields: [
        {
          name: 'position',
          type: 'text',
          label: 'Position',
          required: true,
        },
        {
          name: 'city',
          type: 'text',
          label: 'City',
          required: true,
        },
        {
          name: 'locationType',
          type: 'select',
          label: 'Location Type',
          defaultValue: 'Hybrid',
          options: [
            { label: 'On-site', value: 'On-site' },
            { label: 'Hybrid', value: 'Hybrid' },
            { label: 'Remote', value: 'Remote' },
          ],
        },
        link({
          appearances: ['default'],
          overrides: {
            name: 'applyLink',
            label: 'Apply Link',
          },
        }),
      ],
    },
  ],
}