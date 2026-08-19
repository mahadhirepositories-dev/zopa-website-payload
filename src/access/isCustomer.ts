import type { FieldAccess } from 'payload'

export const isCustomer: FieldAccess = ({ req: { user } }) => {
  return Boolean(user && user.role !== 'admin')
}