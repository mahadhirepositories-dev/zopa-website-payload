import type { CollectionConfig } from 'payload'
import { authenticated } from '@/access/authenticated'

export const Emails: CollectionConfig = {
  slug: 'emails',
  access: {
    create: authenticated,
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    useAsTitle: 'to',
    defaultColumns: ['orderId', 'to', 'status', 'attempts', 'nextRetryAt', 'updatedAt'],
  },
  fields: [
    { name: 'orderId', type: 'number', required: true, index: true, unique: true },
    { name: 'to', type: 'email', required: true },
    { name: 'subject', type: 'text', required: true },
    { name: 'html', type: 'textarea', required: true },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'pending',
      index: true,
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Processing', value: 'processing' },
        { label: 'Sent', value: 'sent' },
        { label: 'Failed', value: 'failed' },
      ],
    },
    { name: 'attempts', type: 'number', defaultValue: 0 },
    {
      name: 'lastError',
      type: 'textarea',
      admin: { description: 'Last failure message — surface me in the admin' },
    },
    { name: 'nextRetryAt', type: 'date' },
    { name: 'sentAt', type: 'date' },
  ],
}