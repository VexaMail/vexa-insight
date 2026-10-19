import type { TabNavItem } from './TabNavItem'

export type TabNavProps = {
  readonly items: readonly TabNavItem[]
  readonly active: string
  readonly label: string
}
