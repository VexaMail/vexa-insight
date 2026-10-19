import type { dataTableFeatures } from '@/lib/dataTableFeatures'
import type { Row } from '@tanstack/react-table'
import type { DomainsTableRow } from './DomainsTableRow'

export type UseDomainsTableReturn = {
  readonly filtered: DomainsTableRow[]
  readonly statusFilter: string
  readonly handleRowClick: (
    row: Row<typeof dataTableFeatures, DomainsTableRow>,
  ) => void
  readonly handleStatusChange: (value: string) => void
  /** Keeps the prev/next navigator on the filtered list. */
  readonly handleNavigate: () => void
}
