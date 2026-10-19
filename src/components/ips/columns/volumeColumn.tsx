'use client'

import { SortableHeaderButton } from '@/components/ui'
import type { dataTableFeatures } from '@/lib/dataTableFeatures'
import type { IpSourceRow } from '@/types/ips'
import type { ColumnDef } from '@tanstack/react-table'

export const volumeColumn: ColumnDef<typeof dataTableFeatures, IpSourceRow> = {
  accessorKey: 'totalMessages',
  header: ({ column }) => (
    <SortableHeaderButton column={column} label="Messages" />
  ),
  cell: ({ row }) => (
    <span className="text-foreground block text-right font-mono text-[13px] tabular-nums">
      {row.original.totalMessages.toLocaleString()}
    </span>
  ),
}
