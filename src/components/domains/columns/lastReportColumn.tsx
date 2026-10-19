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
  accessorFn: (row) => row.lastReportDay ?? -1,
  header: ({ column }) => (
    <SortableHeaderButton column={column} label="Last report" />
  ),
  cell: ({ row }) => (
    <LastReportLabel lastReportDay={row.original.lastReportDay} />
  ),
  enableGlobalFilter: false,
}
