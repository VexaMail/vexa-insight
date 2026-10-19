'use client'

import { SortableHeaderButton } from '@/components/ui'
import type { dataTableFeatures } from '@/lib/dataTableFeatures'
import type { IpSourceRow } from '@/types/ips'
import type { ColumnDef } from '@tanstack/react-table'
import { IpRatePercent } from '../IpRatePercent'

/** Share of the source's messages whose SPF passed aligned with From. */
export const spfRateColumn: ColumnDef<typeof dataTableFeatures, IpSourceRow> = {
  accessorKey: 'spfPassRate',
  header: ({ column }) => (
    <SortableHeaderButton column={column} label="SPF aligned" />
  ),
  cell: ({ row }) => <IpRatePercent rate={row.original.spfPassRate} />,
}
