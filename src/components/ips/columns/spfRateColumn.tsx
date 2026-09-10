'use client'

import type { dataTableFeatures } from '@/lib/dataTableFeatures'
import type { IpSummaryData } from '@/types/ips'
import type { ColumnDef } from '@tanstack/react-table'
import { IpRatePercent } from '../IpRatePercent'

export const spfRateColumn: ColumnDef<typeof dataTableFeatures, IpSummaryData> =
  {
    accessorKey: 'spfPassRate',
    header: 'SPF',
    cell: ({ row }) => <IpRatePercent rate={row.original.spfPassRate} />,
    meta: { className: 'hidden lg:table-cell' },
  }
