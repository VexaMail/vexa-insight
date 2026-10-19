'use client'

import type { dataTableFeatures } from '@/lib/dataTableFeatures'
import type { ColumnDef } from '@tanstack/react-table'
import type { ReportRow } from '../ReportRow'

export const messagesColumn: ColumnDef<typeof dataTableFeatures, ReportRow> = {
  id: 'messages',
  header: () => (
    <span className="text-muted-foreground block text-right text-xs font-medium">
      Messages
    </span>
  ),
  cell: ({ row }) => (
    <span className="text-foreground block text-right font-mono text-sm tabular-nums">
      {(row.original.dmarcOutcome?.totalMessages ?? 0).toLocaleString('en-US')}
    </span>
  ),
  enableGlobalFilter: false,
}
