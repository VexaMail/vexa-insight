'use client'

import { ThemeContext } from '@/contexts/shell'
import { useContext } from 'react'

export function useTheme() {
  return useContext(ThemeContext)
}
