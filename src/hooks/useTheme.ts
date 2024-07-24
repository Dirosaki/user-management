import { useContext } from 'react'

import { ThemeContext } from '@/contexts/ThemeProvider'

export function useTheme() {
  const context = useContext(ThemeContext)

  return context
}
