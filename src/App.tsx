import { LoaderCircle } from 'lucide-react'
import { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { ThemeProvider } from '@/contexts/ThemeProvider'

import { Routes } from './Router'

import '@/styles/global.css'

export function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Suspense
          fallback={
            <div className="flex flex-1 items-center justify-center">
              <LoaderCircle className="animate-spin text-primary" size={32} />
            </div>
          }
        >
          <Routes />
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  )
}
