import type { FieldAccess } from 'payload'

export const adminOnlyFieldAccess: FieldAccess = ({ req: { user } }) => {
  return Boolean(user?.role === 'admin')
}