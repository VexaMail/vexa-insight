'use client'

import type { dataTableFeatures } from '@/lib/dataTableFeatures'
import type { IpSourceRow } from '@/types/ips'
import type { ColumnDef } from '@tanstack/react-table'
import { IpSourceSummaryRow } from '../IpSourceSummaryRow'

/** The whole row as one summary, for phone widths only. */
export const phoneSummaryColumn: ColumnDef<
  typeof dataTableFeatures,
  IpSourceRow
> = {
  id: 'summary',
  header: 'Source',
  enableGlobalFilter: false,
  cell: ({ row }) => <IpSourceSummaryRow row={row.original} />,
}
