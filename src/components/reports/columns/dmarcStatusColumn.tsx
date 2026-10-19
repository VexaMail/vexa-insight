'use client'

import type { dataTableFeatures } from '@/lib/dataTableFeatures'
import type { ColumnDef } from '@tanstack/react-table'
import { ReportOutcomePill } from '../ReportOutcomePill'
import type { ReportRow } from '../ReportRow'

export const dmarcStatusColumn: ColumnDef<typeof dataTableFeatures, ReportRow> =
  {
    id: 'dmarcStatus',
    header: () => (
      <span className="text-muted-foreground text-xs font-medium">Status</span>
    ),
    cell: ({ row }) => (
      <ReportOutcomePill outcome={row.original.dmarcOutcome} />
    ),
    enableGlobalFilter: false,
  }
