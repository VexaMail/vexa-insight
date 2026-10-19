'use client'

import type { dataTableFeatures } from '@/lib/dataTableFeatures'
import type { ColumnDef } from '@tanstack/react-table'
import { ReportFailingCell } from '../ReportFailingCell'
import type { ReportRow } from '../ReportRow'

export const failingColumn: ColumnDef<typeof dataTableFeatures, ReportRow> = {
  id: 'failing',
  header: () => (
    <span
      className="text-muted-foreground text-xs font-medium"
      title="Messages aligned on neither SPF nor DKIM, and their share"
    >
      Failing / rate
    </span>
  ),
  cell: ({ row }) => <ReportFailingCell outcome={row.original.dmarcOutcome} />,
  enableGlobalFilter: false,
}
