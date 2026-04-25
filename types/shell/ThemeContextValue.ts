import type { Theme } from '@/types/shell'

export type ThemeContextValue = {
  readonly theme: Theme
  readonly toggleTheme: () => void
}
