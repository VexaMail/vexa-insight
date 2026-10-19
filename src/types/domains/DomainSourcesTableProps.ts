import type { DomainSourceRow } from './DomainSourceRow'

/**
 * Props for the domain sources table component.
 */
export type DomainSourcesTableProps = {
  sources: DomainSourceRow[]
  /** Where the same list downloads as CSV, when offered. */
  csvHref?: string
  /** The window the rows cover in days, undefined for all reports. */
  days?: number | undefined
}
