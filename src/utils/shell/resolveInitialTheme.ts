import type { Theme } from '@/types/shell'

/**
 * The theme to start in: the one the person picked last, otherwise the
 * light theme. Mirrors the inline script in the root layout, which
 * applies the same choice before first paint.
 */
export function resolveInitialTheme(): Theme {
  const stored = localStorage.getItem('theme')
  if (stored === 'dark' || stored === 'light') return stored
  return 'light'
}
