import { useRoutes } from 'react-router-dom'

import { lazyLoad } from './utils/lazyLoad'

const { Login } = lazyLoad(() => import('@/pages/Login'))

export function Routes() {
  return useRoutes([{ path: '/', element: <Login /> }])
}
