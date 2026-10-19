import type { NavItem } from './NavItem'

/** A labelled block of the sidebar, e.g. "Operate" or "Investigate". */
export type NavGroup = {
  readonly label: string
  readonly items: readonly NavItem[]
  /** `footer` groups sit at the bottom of the sidebar, above the version. */
  readonly placement: 'main' | 'footer'
}
