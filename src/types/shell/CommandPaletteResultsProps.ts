import type { CommandTarget } from './CommandTarget'
import type { NavItem } from './NavItem'

export type CommandPaletteResultsProps = {
  readonly targets: readonly CommandTarget[]
  readonly pages: readonly NavItem[]
  readonly onGo: (href: string) => void
}
