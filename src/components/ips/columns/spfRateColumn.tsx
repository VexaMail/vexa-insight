'use client'

import type { IpSummaryData } from '@/types/ips'
import type { ColumnDef } from '@tanstack/react-table'
import { IpRatePercent } from '../IpRatePercent'

export const spfRateColumn: ColumnDef<IpSummaryData> = {
  accessorKey: 'spfPassRate',
  header: 'SPF',
  cell: ({ row }) => <IpRatePercent rate={row.original.spfPassRate} />,
  meta: { className: 'hidden lg:table-cell' },
}
