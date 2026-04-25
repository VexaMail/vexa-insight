import type { ThemeContextValue } from '@/types/shell'

export type UseThemeProviderReturn = {
  readonly contextValue: ThemeContextValue
  readonly mounted: boolean
}
