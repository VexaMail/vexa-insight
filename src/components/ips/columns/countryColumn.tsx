'use client'

import type { IpSummaryData } from '@/types/ips'
import type { ColumnDef } from '@tanstack/react-table'
import { IpDisplay } from '../IpDisplay'

export const countryColumn: ColumnDef<IpSummaryData> = {
  accessorKey: 'countryCode',
  header: 'Country',
  cell: ({ row }) => (
    <IpDisplay
      ip={row.original.ip}
      countryCode={row.original.countryCode}
      layout="none"
      showIp={false}
      showHostname={false}
    />
  ),
  filterFn: (row, columnId, filterValue) => {
    if (!filterValue || filterValue === 'All') return true
    return row.getValue(columnId) === filterValue
  },
}
