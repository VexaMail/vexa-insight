'use client'

import { SortableHeaderButton } from '@/components/ui'
import type { dataTableFeatures } from '@/lib/dataTableFeatures'
import type { IpSourceRow } from '@/types/ips'
import type { ColumnDef } from '@tanstack/react-table'
import { IpLastSeen } from '../IpLastSeen'

export const lastSeenColumn: ColumnDef<typeof dataTableFeatures, IpSourceRow> =
  {
    accessorKey: 'lastSeen',
    header: ({ column }) => (
      <SortableHeaderButton column={column} label="Last seen" />
    ),
    cell: ({ row }) => <IpLastSeen lastSeen={row.original.lastSeen} />,
  }
