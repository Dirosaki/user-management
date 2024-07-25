import { toast } from 'sonner'

import { RBAC } from '@/constants/rbac'
import { useStore } from '@/store'
import { Actions, Pages } from '@/types/permissions'

export function getUserPermission(page: Pages) {
  const role = useStore.getState().auth.loggedInUser?.role
  const { logout } = useStore.getState().auth

  if (!role) {
    toast.error('Usuário não autenticado!')
    logout()
  }

  const permissions: Actions[] = role ? RBAC[role][page] : []

  function can(action: Actions) {
    if (!permissions.includes('*') && !permissions.includes('read')) {
      return false
    }

    return permissions.includes('*') || permissions.includes(action)
  }

  const cannot = (action: Actions) => !can(action)

  return {
    can,
    cannot,
  }
}
