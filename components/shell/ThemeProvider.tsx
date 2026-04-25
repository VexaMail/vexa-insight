'use client'

import { ThemeContext } from '@/contexts/shell'
import { useThemeProvider } from '@/hooks/shell'
import type { ThemeProviderProps } from '@/types/shell'
import { LazyMotion, domAnimation } from 'framer-motion'

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const { contextValue, mounted } = useThemeProvider()

  return (
    <ThemeContext.Provider value={contextValue}>
      {mounted ? (
        <LazyMotion features={domAnimation}>{children}</LazyMotion>
      ) : (
        children
      )}
    </ThemeContext.Provider>
  )
}
