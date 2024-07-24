import { useRoutes } from 'react-router-dom'

import { lazyLoad } from './utils/lazyLoad'

const { Login } = lazyLoad(() => import('@/pages/Login'))
const { Register } = lazyLoad(() => import('@/pages/Register'))
const { UserManagement } = lazyLoad(() => import('@/pages/UserManagement'))

export function Routes() {
  return useRoutes([
    { path: '/', element: <UserManagement /> },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
  ])
}
