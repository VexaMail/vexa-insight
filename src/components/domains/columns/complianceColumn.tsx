'use client'

import { SortableHeaderButton } from '@/components/ui'
import type { dataTableFeatures } from '@/lib/dataTableFeatures'
import type { DomainsTableRow } from '@/types/domains'
import { isLastReportStale } from '@/utils/domains'
import type { ColumnDef } from '@tanstack/react-table'
import { ComplianceBar } from '../ComplianceBar'

export const complianceColumn: ColumnDef<
  typeof dataTableFeatures,
  DomainsTableRow
> = {
  accessorKey: 'passRatePercent',
  header: ({ column }) => (
    <SortableHeaderButton column={column} label="Compliance" descendingFirst />
  ),
  cell: ({ row }) =>
    row.original.totalMessages === 0 ? (
      <span className="text-unknown text-xs">No mail reported</span>
    ) : (
      <ComplianceBar
        passRate={row.original.passRatePercent}
        muted={isLastReportStale(row.original.lastReportDay)}
      />
    ),
}
