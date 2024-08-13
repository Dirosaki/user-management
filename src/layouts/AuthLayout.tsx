import { MoonIcon, SunIcon } from 'lucide-react'
import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import { Button } from '@/components/Button'
import { FallbackLoading } from '@/components/Fallback'
import { useTheme } from '@/hooks/useTheme'

export function AuthLayout() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex flex-1 items-center justify-center">
      <Button
        aria-label="Alternar tema"
        className="absolute right-4 top-4"
        size="icon"
        variant="outline"
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      >
        <SunIcon
          aria-hidden="true"
          className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
          size={18}
        />
        <MoonIcon
          aria-hidden="true"
          className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
          size={18}
        />
      </Button>

      <Suspense fallback={<FallbackLoading />}>
        <Outlet />
      </Suspense>
    </div>
  )
}
