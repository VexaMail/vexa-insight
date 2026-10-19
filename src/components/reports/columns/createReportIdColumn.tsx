'use client'

import { SortHeaderButton } from '@/components/ui'
import type { dataTableFeatures } from '@/lib/dataTableFeatures'
import type { ColumnDef } from '@tanstack/react-table'
import type { GetReportsColumnsParams } from '../GetReportsColumnsParams'
import { ReportIdChip } from '../ReportIdChip'
import type { ReportRow } from '../ReportRow'

export function createReportIdColumn({
  dispatch,
  sortKey,
  sortDir,
}: GetReportsColumnsParams): ColumnDef<typeof dataTableFeatures, ReportRow> {
  return {
    accessorKey: 'reportId',
    header: () => (
      <SortHeaderButton
        label="Report ID"
        active={sortKey === 'reportId'}
        dir={sortDir}
        onSort={() => {
          dispatch({ type: 'SET_SORT', payload: { key: 'reportId' } })
        }}
      />
    ),
    cell: ({ row }) => (
      <ReportIdChip reportId={row.original.reportId} visibleChars={14} />
    ),
  }
}
