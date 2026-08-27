'use client'

import { useEffect, useState } from 'react'

import type { UseXmlViewerReturn } from '@/types/reports'

export function useXmlViewer(): UseXmlViewerReturn {
  const [editorTheme, setEditorTheme] = useState<'vs-dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'vs-dark'
        : 'light'
    }
    return 'light'
  })

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    function handleThemeChange(e: MediaQueryListEvent) {
      setEditorTheme(e.matches ? 'vs-dark' : 'light')
    }

    mediaQuery.addEventListener('change', handleThemeChange)
    return () => {
      mediaQuery.removeEventListener('change', handleThemeChange)
    }
  }, [])

  return { editorTheme }
}
