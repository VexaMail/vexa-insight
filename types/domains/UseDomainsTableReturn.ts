import type { DomainSummary } from '@/types/reports'
import type { Row } from '@tanstack/react-table'

import type { DomainsTableRow } from '@/types/domains'
import type { ChangeEvent } from 'react'

export type UseDomainsTableReturn = {
  readonly filtered: DomainSummary[]
  readonly statusFilter: string
  readonly handleRowClick: (row: Row<DomainsTableRow>) => void
  readonly handleStatusChange: (value: string) => void
  readonly handleStatusSelectChange: (
    event: ChangeEvent<HTMLSelectElement>,
  ) => void
}
