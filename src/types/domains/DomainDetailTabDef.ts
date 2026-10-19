import type { DomainDetailTab } from './DomainDetailTab'

/** A tab of the domain page and its label. */
export type DomainDetailTabDef = {
  readonly key: DomainDetailTab
  readonly label: string
}
