import { useRoutes } from 'react-router-dom'

import { AuthLayout } from '@/layouts/AuthLayout'
import { PrivateLayout } from '@/layouts/PrivateLayout'

import { lazyLoad } from '../utils/lazyLoad'

import { AuthGuard } from './AuthGuard'

const { ForgotPassword } = lazyLoad(() => import('@/pages/ForgotPassword'))
const { Login } = lazyLoad(() => import('@/pages/Login'))
const { Register } = lazyLoad(() => import('@/pages/Register'))
const { UserManagement } = lazyLoad(() => import('@/pages/UserManagement'))

export function Routes() {
  return useRoutes([
    {
      element: <AuthGuard />,
      children: [
        {
          element: <AuthLayout />,
          children: [
            { path: '/forgot-password', element: <ForgotPassword /> },
            { path: '/login', element: <Login /> },
            { path: '/register', element: <Register /> },
          ],
        },
      ],
    },
    {
      element: <AuthGuard isPrivate />,
      children: [
        {
          element: <PrivateLayout />,
          children: [{ path: '/', element: <UserManagement /> }],
        },
      ],
    },
  ])
}
