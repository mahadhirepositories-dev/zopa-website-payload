import type { Block } from "payload";

export const RecentClients: Block = {
  slug: 'recentClients',
  interfaceName: 'RecentClientsBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
    },
    {
      name: 'clients',
      type: 'array',
      label: 'Client Logos (8)',
      minRows: 8,
      maxRows: 8,
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
  labels: { plural: 'Recent Clients', singular: 'Recent Clients' },
}