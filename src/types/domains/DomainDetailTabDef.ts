import type { LucideIcon } from 'lucide-react'
import type { DomainDetailTab } from './DomainDetailTab'

/** A tab of the domain page, its label and its icon. */
export type DomainDetailTabDef = {
  readonly key: DomainDetailTab
  readonly label: string
  readonly icon: LucideIcon
}
