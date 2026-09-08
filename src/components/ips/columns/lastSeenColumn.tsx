'use client'

import { SortableHeaderButton } from '@/components/ui'
import type { IpSummaryData } from '@/types/ips'
import { formatRelativeDate } from '@/utils/format'
import type { ColumnDef } from '@tanstack/react-table'

export const lastSeenColumn: ColumnDef<IpSummaryData> = {
  accessorKey: 'lastSeen',
  header: ({ column }) => (
    <SortableHeaderButton column={column} label="Last Seen" />
  ),
  cell: ({ row }) => {
    const lastSeen = row.original.lastSeen
    if (!lastSeen)
      return (
        <span className="text-muted-foreground/50 text-sm italic">Unknown</span>
      )

    const { relative, absolute } = formatRelativeDate(lastSeen)

    return (
      <span className="text-muted-foreground text-sm" title={absolute}>
        {relative}
      </span>
    )
  },
  meta: { className: 'hidden md:table-cell' },
}
