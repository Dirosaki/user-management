import { toast } from 'sonner'

import { RBAC } from '@/constants/rbac'
import { useStore } from '@/store'
import { Actions, Pages } from '@/types/permissions'

export function getUserPermission(page: Pages) {
  const role = useStore.getState().auth.loggedInUser?.role

  if (!role) {
    toast.error('Você não possui nenhuma permissões, contate um administrador!')
  }

  const permissions: Actions[] = role ? RBAC[role][page] : []

  const can = (action: Actions) => permissions.includes('*') || permissions.includes(action)

  const cannot = (action: Actions) => !can(action)

  return {
    can,
    cannot,
  }
}
