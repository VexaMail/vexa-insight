'use client'

import type { dataTableFeatures } from '@/lib/dataTableFeatures'
import type { IpSummaryData } from '@/types/ips'
import type { ColumnDef } from '@tanstack/react-table'
import { IpRatePercent } from '../IpRatePercent'

export const dkimRateColumn: ColumnDef<
  typeof dataTableFeatures,
  IpSummaryData
> = {
  accessorKey: 'dkimPassRate',
  header: 'DKIM',
  cell: ({ row }) => <IpRatePercent rate={row.original.dkimPassRate} />,
  meta: { className: 'hidden lg:table-cell' },
}
