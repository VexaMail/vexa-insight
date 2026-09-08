'use client'

import type { IpSummaryData } from '@/types/ips'
import type { ColumnDef } from '@tanstack/react-table'
import { IpRatePercent } from '../IpRatePercent'

export const dkimRateColumn: ColumnDef<IpSummaryData> = {
  accessorKey: 'dkimPassRate',
  header: 'DKIM',
  cell: ({ row }) => <IpRatePercent rate={row.original.dkimPassRate} />,
  meta: { className: 'hidden lg:table-cell' },
}
