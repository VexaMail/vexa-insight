'use client'

import { SortableHeaderButton } from '@/components/ui'
import type { dataTableFeatures } from '@/lib/dataTableFeatures'
import type { IpSourceRow } from '@/types/ips'
import type { ColumnDef } from '@tanstack/react-table'
import { IpSenderName } from '../IpSenderName'

export const senderColumn: ColumnDef<typeof dataTableFeatures, IpSourceRow> = {
  id: 'sender',
  accessorFn: (row) => row.sender?.name ?? '',
  header: ({ column }) => (
    <SortableHeaderButton column={column} label="Sender" />
  ),
  cell: ({ row }) => <IpSenderName sender={row.original.sender} />,
}
