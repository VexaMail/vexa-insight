import type { NavItem } from './NavItem'

/** A labelled block of the sidebar, e.g. "Operate" or "Investigate". */
export type NavGroup = {
  readonly label: string
  readonly items: readonly NavItem[]
}
