import { useRoutes } from 'react-router-dom'

export function Routes() {
  return useRoutes([{ path: '/', element: <h1>Login</h1> }])
}
