'use client'

import { Badge, SortableHeaderButton } from '@/components/ui'
import type { DomainsTableRow } from '@/types/domains'
import { getDomainStatus } from '@/utils/domains'
import type { ColumnDef } from '@tanstack/react-table'
import { getComplianceStyles } from '../getComplianceStyles'

export const statusColumn: ColumnDef<DomainsTableRow> = {
  id: 'status',
  accessorFn: (row) => getDomainStatus(row.passRatePercent),
  header: ({ column }) => (
    <SortableHeaderButton column={column} label="Status" />
  ),
  cell: ({ row }) => {
    const { statusLabel, statusClass } = getComplianceStyles(
      row.original.passRatePercent,
    )

    return (
      <Badge variant="outline" className={statusClass}>
        {statusLabel}
      </Badge>
    )
  },
  enableGlobalFilter: false,
}
