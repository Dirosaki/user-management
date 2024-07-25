import { Permissions } from '@/types/permissions'

export const RBAC = {
  admin: {
    'user-management': ['*'],
  },
  user: {
    'user-management': ['read'],
  },
} satisfies Permissions
