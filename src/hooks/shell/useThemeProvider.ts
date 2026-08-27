import type {
  Theme,
  ThemeContextValue,
  UseThemeProviderReturn,
} from '@/types/shell'
import { useEffect, useMemo, useState } from 'react'

export function useThemeProvider(): UseThemeProviderReturn {
  const [theme, setTheme] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => {
      const stored = localStorage.getItem('theme') as Theme | null
      const resolved = stored === 'dark' ? 'dark' : 'light'

      setTheme(resolved)
      document.documentElement.classList.toggle('dark', resolved === 'dark')
      setMounted(true)
    }, 0)

    return () => {
      clearTimeout(t)
    }
  }, [])

  const contextValue = useMemo<ThemeContextValue>(() => {
    const toggleTheme = () => {
      setTheme((currentTheme) => {
        const next = currentTheme === 'dark' ? 'light' : 'dark'
        localStorage.setItem('theme', next)
        document.documentElement.classList.toggle('dark', next === 'dark')
        return next
      })
    }

    return { theme, toggleTheme }
  }, [theme])

  return { contextValue, mounted }
}
