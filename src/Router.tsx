import { useRoutes } from 'react-router-dom'

import { lazyLoad } from './utils/lazyLoad'

const { Login } = lazyLoad(() => import('@/pages/Login'))
const { Register } = lazyLoad(() => import('@/pages/Register'))

export function Routes() {
  return useRoutes([
    { path: '/', element: <Login /> },
    { path: '/register', element: <Register /> },
  ])
}
