import type { CommandTarget } from './CommandTarget'
import type { NavItem } from './NavItem'

export type UseCommandPaletteReturn = {
  readonly open: boolean
  readonly setOpen: (open: boolean) => void
  readonly query: string
  readonly setQuery: (query: string) => void
  readonly targets: readonly CommandTarget[]
  readonly pages: readonly NavItem[]
  readonly go: (href: string) => void
}
