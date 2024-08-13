import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import { FallbackLoading } from '@/components/Fallback'
import { Header } from '@/components/Header'

export function PrivateLayout() {
  return (
    <div className="flex flex-1 flex-col bg-card">
      <Header />

      <Suspense fallback={<FallbackLoading />}>
        <Outlet />
      </Suspense>
    </div>
  )
}
