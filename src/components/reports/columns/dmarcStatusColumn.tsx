'use client'

import type { dataTableFeatures } from '@/lib/dataTableFeatures'
import type { ColumnDef } from '@tanstack/react-table'
import { ReportDmarcStatusIcon } from '../ReportDmarcStatusIcon'
import type { ReportRow } from '../ReportRow'

export const dmarcStatusColumn: ColumnDef<typeof dataTableFeatures, ReportRow> =
  {
    id: 'dmarcStatus',
    header: () => <span className="sr-only">DMARC status</span>,
    cell: ({ row }) => (
      <ReportDmarcStatusIcon outcome={row.original.dmarcOutcome} />
    ),
    enableGlobalFilter: false,
  }
