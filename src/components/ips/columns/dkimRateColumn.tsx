'use client'

import { SortableHeaderButton } from '@/components/ui'
import type { dataTableFeatures } from '@/lib/dataTableFeatures'
import type { IpSourceRow } from '@/types/ips'
import type { ColumnDef } from '@tanstack/react-table'
import { IpRatePercent } from '../IpRatePercent'

/** Share of the source's messages whose DKIM passed aligned with From. */
export const dkimRateColumn: ColumnDef<typeof dataTableFeatures, IpSourceRow> =
  {
    accessorKey: 'dkimPassRate',
    header: ({ column }) => (
      <SortableHeaderButton column={column} label="DKIM aligned" />
    ),
    cell: ({ row }) => <IpRatePercent rate={row.original.dkimPassRate} />,
  }
