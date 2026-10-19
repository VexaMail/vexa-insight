'use client'

import type { dataTableFeatures } from '@/lib/dataTableFeatures'
import type { ColumnDef } from '@tanstack/react-table'
import type { GetReportsColumnsParams } from '../GetReportsColumnsParams'
import { OpenReportLink } from '../OpenReportLink'
import type { ReportRow } from '../ReportRow'

export function createActionsColumn({
  domainName,
  filtered,
}: GetReportsColumnsParams): ColumnDef<typeof dataTableFeatures, ReportRow> {
  return {
    id: 'actions',
    header: () => <span className="sr-only">Open</span>,
    cell: ({ row }) => (
      <OpenReportLink
        reportId={row.original.id}
        domainName={domainName}
        scopeIds={filtered.map((r) => r.id.toString())}
      />
    ),
    enableGlobalFilter: false,
  }
}
