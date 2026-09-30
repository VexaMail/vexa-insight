'use client'

import { Badge, SortableHeaderButton } from '@/components/ui'
import type { dataTableFeatures } from '@/lib/dataTableFeatures'
import type { DomainsTableRow } from '@/types/domains'
import { DAY_SECONDS } from '@/utils/dates'
import { formatRelativeDate } from '@/utils/format'
import { isReportCoverageStale } from '@/utils/gaps'
import type { ColumnDef } from '@tanstack/react-table'

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
  cell: ({ row }) => {
    const day = row.original.lastReportDay
    if (day == null) {
      return <span className="text-muted-foreground text-sm">Never</span>
    }
    const { relative, absolute } = formatRelativeDate(day * DAY_SECONDS)
    return (
      <span className="text-muted-foreground flex items-center gap-2 text-sm">
        <span title={absolute}>{relative}</span>
        {isReportCoverageStale(day, Date.now()) ? (
          <Badge variant="outline" className="border-amber-500 text-amber-600">
            No reports
          </Badge>
        ) : null}
      </span>
    )
  },
  enableGlobalFilter: false,
}
