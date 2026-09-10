'use client'

import { SortableHeaderButton } from '@/components/ui'
import type { dataTableFeatures } from '@/lib/dataTableFeatures'
import type { IpSummaryData } from '@/types/ips'
import type { ColumnDef } from '@tanstack/react-table'

export const volumeColumn: ColumnDef<typeof dataTableFeatures, IpSummaryData> =
  {
    accessorKey: 'totalMessages',
    header: ({ column }) => (
      <SortableHeaderButton column={column} label="Volume" />
    ),
    cell: ({ row }) => (
      <span className="text-sm text-zinc-600 dark:text-zinc-400">
        {row.original.totalMessages.toLocaleString()}
      </span>
    ),
  }
