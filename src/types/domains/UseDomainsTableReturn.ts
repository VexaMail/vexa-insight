import type { DomainSummary } from '@/types/reports'
import type { Row } from '@tanstack/react-table'

import type { ChangeEvent } from 'react'
import type { DomainsTableRow } from './DomainsTableRow'

export type UseDomainsTableReturn = {
  readonly filtered: DomainSummary[]
  readonly statusFilter: string
  readonly handleRowClick: (row: Row<DomainsTableRow>) => void
  readonly handleStatusChange: (value: string) => void
  readonly handleStatusSelectChange: (
    event: ChangeEvent<HTMLSelectElement>,
  ) => void
}
