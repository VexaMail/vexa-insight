import type { DomainSource } from '@/types/reports'

/**
 * Props for the domain sources table component.
 */
export type DomainSourcesTableProps = {
  sources: DomainSource[]
  /** Where the same list downloads as CSV, when offered. */
  csvHref?: string
}
