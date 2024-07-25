import { useRef } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { useStore } from '@/store'

export function AuthGuard({ isPrivate = false }: { isPrivate?: boolean }) {
  const from = useRef('/')
  const { pathname } = useLocation()

  const loggedInUser = useStore((state) => state.auth.loggedInUser)

  if (loggedInUser && !isPrivate) {
    return <Navigate to={from.current} replace />
  }

  if (!loggedInUser && isPrivate) {
    from.current = pathname

    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
