import { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { FallbackLoading } from '@/components/Fallback'
import { Toaster } from '@/components/Toaster'
import { ThemeProvider } from '@/contexts/ThemeProvider'
import { Routes } from '@/Router'

import '@/styles/global.css'

export function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Suspense fallback={<FallbackLoading />}>
          <Routes />
        </Suspense>
        <Toaster />
      </BrowserRouter>
    </ThemeProvider>
  )
}
