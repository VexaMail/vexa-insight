'use client'

import { SortableHeaderButton } from '@/components/ui'
import type { IpSummaryData } from '@/types/ips'
import type { ColumnDef } from '@tanstack/react-table'
import { IpDisplay } from '../IpDisplay'

export const ipColumn: ColumnDef<IpSummaryData> = {
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
