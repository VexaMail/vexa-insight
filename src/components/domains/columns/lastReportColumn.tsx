'use client'

import { SortableHeaderButton } from '@/components/ui'
import type { dataTableFeatures } from '@/lib/dataTableFeatures'
import type { DomainsTableRow } from '@/types/domains'
import type { ColumnDef } from '@tanstack/react-table'
import { LastReportLabel } from '../LastReportLabel'

/** When the domain last got a report, flagged once it has gone silent. */
export const lastReportColumn: ColumnDef<
  typeof dataTableFeatures,
  DomainsTableRow
> = {
  id: 'lastReport',
  accessorFn: (row) => row.policy?.reportedAt ?? -1,
  header: ({ column }) => (
    <span title="End of the newest report period">
      <SortableHeaderButton column={column} label="Last report" />
    </span>
  ),
  cell: ({ row }) => (
    <LastReportLabel
      reportedAt={row.original.policy?.reportedAt}
      lastReportDay={row.original.lastReportDay}
    />
  ),
  enableGlobalFilter: false,
}
