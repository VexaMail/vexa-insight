'use client'

import { SortableHeaderButton } from '@/components/ui'
import type { dataTableFeatures } from '@/lib/dataTableFeatures'
import type { DomainsTableRow } from '@/types/domains'
import type { ColumnDef } from '@tanstack/react-table'

export const messagesColumn: ColumnDef<
  typeof dataTableFeatures,
  DomainsTableRow
> = {
  accessorKey: 'totalMessages',
  header: ({ column }) => (
    <SortableHeaderButton column={column} label="Messages" descendingFirst />
  ),
  cell: ({ row }) => (
    <span className="text-muted-foreground text-sm">
      {row.original.totalMessages.toLocaleString()}
    </span>
  ),
}
