'use client'

import { SortHeaderButton } from '@/components/ui'
import type { ColumnDef } from '@tanstack/react-table'
import { FileText } from 'lucide-react'
import type { GetReportsColumnsParams } from '../GetReportsColumnsParams'
import type { ReportRow } from '../ReportRow'

export function createReportIdColumn({
  dispatch,
  sortKey,
  sortDir,
}: GetReportsColumnsParams): ColumnDef<ReportRow> {
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
      <div className="flex items-center gap-2">
        <FileText className="text-primary h-3.5 w-3.5 shrink-0" />
        <span className="text-foreground font-mono text-xs">
          {row.getValue('reportId')}
        </span>
      </div>
    ),
  }
}
