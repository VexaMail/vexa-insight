'use client'

import { SortableHeaderButton } from '@/components/ui'
import type { dataTableFeatures } from '@/lib/dataTableFeatures'
import type { IpSummaryData } from '@/types/ips'
import type { ColumnDef } from '@tanstack/react-table'
import { IpDisplay } from '../IpDisplay'

export const ipColumn: ColumnDef<typeof dataTableFeatures, IpSummaryData> = {
  accessorKey: 'ip',
  header: ({ column }) => (
    <SortableHeaderButton column={column} label="IP Address" />
  ),
  cell: ({ row }) => (
    <IpDisplay
      ip={row.getValue<string>('ip')}
      layout="none"
      showFlag={false}
      showHostname={false}
      ipAsLink={false}
    />
  ),
}
