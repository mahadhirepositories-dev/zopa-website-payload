import type { Block } from 'payload'
 
export const JobDetail: Block = {
  slug: 'jobDetail',
  interfaceName: 'JobDetailBlock',
  labels: { singular: 'Job Detail', plural: 'Job Detail Sections' },
  fields: [
    { name: 'city', type: 'text', label: 'City', required: true },
    {
      name: 'locationType',
      type: 'select',
      label: 'Location Type',
      required: true,
      options: [
        { label: 'On-site', value: 'On-site' },
        { label: 'Hybrid', value: 'Hybrid' },
        { label: 'Remote', value: 'Remote' },
      ],
    },
    { name: 'aboutRole', type: 'textarea', label: 'About Role' },
    {
      name: 'responsibilities',
      type: 'array',
      label: 'Job Responsibilities',
      labels: { singular: 'Responsibility Item', plural: 'Responsibility Items' },
      fields: [
        {
          name: 'type',
          type: 'select',
          label: 'Item Type',
          required: true,
          defaultValue: 'point',
          options: [
            { label: 'Point', value: 'point' },
            { label: 'Heading + Paragraph', value: 'detailed' },
          ],
        },
        {
          name: 'text',
          type: 'text',
          label: 'Responsibility',
          admin: { condition: (_, sibling) => !sibling?.type || sibling.type === 'point' },
        },
        {
          name: 'heading',
          type: 'text',
          label: 'Heading',
          admin: { condition: (_, sibling) => sibling?.type === 'detailed' },
        },
        {
          name: 'paragraph',
          type: 'textarea',
          label: 'Paragraph',
          admin: { condition: (_, sibling) => sibling?.type === 'detailed' },
        },
      ],
    },
    {
      name: 'minimumRequirements',
      type: 'array',
      label: 'Minimum Requirements',
      fields: [{ name: 'text', type: 'text', label: 'Requirement' }],
    },
    {
      name: 'desiredRequirements',
      type: 'array',
      label: 'Desired Requirements',
      fields: [{ name: 'text', type: 'text', label: 'Requirement' }],
    },
  ],
}
