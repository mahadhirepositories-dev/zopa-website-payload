import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
    name: 'role',
    type: 'select',
    defaultValue: 'customer',
    required: true,
    options: [
      { label: 'Admin', value: 'admin' },
      { label: 'Customer', value: 'customer' },
    ],
    access: {
      read: ({ req: { user } }) => Boolean(user),
      update: ({ req: { user } }) => user?.role === 'admin',
      create: ({ req: { user } }) => user?.role === 'admin',
    },
  },
  ],
  timestamps: true,
}
