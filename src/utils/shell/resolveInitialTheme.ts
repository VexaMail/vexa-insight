import type { Theme } from '@/types/shell'

/**
 * The theme to start in: the one the person picked last, else the operating
 * system's preference. Mirrors the inline script in the root layout, which
 * applies the same choice before first paint.
 */
export function resolveInitialTheme(): Theme {
  const stored = localStorage.getItem('theme')
  if (stored === 'dark' || stored === 'light') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}
