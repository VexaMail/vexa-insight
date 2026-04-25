'use client'

import type { Theme } from '@/types/shell'
import { createContext } from 'react'

export const ThemeContext = createContext<{
  theme: Theme
  toggleTheme: () => void
}>({
  theme: 'light',
  toggleTheme: () => {},
})
