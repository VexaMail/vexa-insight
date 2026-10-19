'use client'

import type { dataTableFeatures } from '@/lib/dataTableFeatures'
import type { IpSourceRow } from '@/types/ips'
import type { ColumnDef } from '@tanstack/react-table'
import { IpFlag } from '../IpFlag'

export const countryColumn: ColumnDef<typeof dataTableFeatures, IpSourceRow> = {
  accessorKey: 'countryCode',
  header: 'Country',
  cell: ({ row }) => <IpFlag countryCode={row.original.countryCode} />,
  filterFn: (row, columnId, filterValue) => {
    if (!filterValue || filterValue === 'All') return true
    return row.getValue(columnId) === filterValue
  },
}
