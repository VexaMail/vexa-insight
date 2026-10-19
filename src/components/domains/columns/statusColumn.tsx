'use client'

import { SortableHeaderButton } from '@/components/ui'
import type { dataTableFeatures } from '@/lib/dataTableFeatures'
import type { DomainsTableRow } from '@/types/domains'
import { getDomainHealth } from '@/utils/domains'
import type { ColumnDef } from '@tanstack/react-table'
import { DomainHealthPill } from '../DomainHealthPill'

export const statusColumn: ColumnDef<
  typeof dataTableFeatures,
  DomainsTableRow
> = {
  id: 'status',
  accessorFn: (row) => getDomainHealth(row),
  header: ({ column }) => (
    <SortableHeaderButton column={column} label="Status" />
  ),
  cell: ({ row }) => <DomainHealthPill {...row.original} />,
  enableGlobalFilter: false,
}
