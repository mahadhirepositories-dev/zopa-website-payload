import type { Access } from 'payload'

export const isDocumentOwner: Access = ({ req: { user } }) => {
  if (user?.role === 'admin') return true
  if (!user) return false
  return { customer: { equals: user.id } }
}