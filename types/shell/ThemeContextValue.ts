import type { Theme } from './Theme'

export type ThemeContextValue = {
  readonly theme: Theme
  readonly toggleTheme: () => void
}
