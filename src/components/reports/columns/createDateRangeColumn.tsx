'use client'

import { SortHeaderButton } from '@/components/ui'
import { formatReportDateRange } from '@/utils/format'
import type { ColumnDef } from '@tanstack/react-table'
import type { GetReportsColumnsParams } from '../GetReportsColumnsParams'
import type { ReportRow } from '../ReportRow'

export function createDateRangeColumn({
  dispatch,
  sortKey,
  sortDir,
}: GetReportsColumnsParams): ColumnDef<ReportRow> {
  return {
    accessorKey: 'beginDate',
    header: () => (
      <SortHeaderButton
        label="Date Range"
        active={sortKey === 'beginDate'}
        dir={sortDir}
        onSort={() => {
          dispatch({ type: 'SET_SORT', payload: { key: 'beginDate' } })
        }}
      />
    ),
    cell: ({ row }) => (
      <span className="text-muted-foreground text-sm">
        {formatReportDateRange(row.original.beginDate, row.original.endDate)}
      </span>
    ),
  }
}
