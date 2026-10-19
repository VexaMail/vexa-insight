import { SortableHeaderButton } from '@/components/ui'
import type { dataTableFeatures } from '@/lib/dataTableFeatures'
import { formatRelativeDate } from '@/utils/format'
import type { ColumnDef } from '@tanstack/react-table'
import type { SourceRow } from '../SourceRow'

/** When a report last included the source. */
export const lastSeenColumn: ColumnDef<typeof dataTableFeatures, SourceRow> = {
  id: 'lastSeen',
  accessorFn: (row) => row.auth?.lastSeen ?? 0,
  header: ({ column }) => (
    <SortableHeaderButton column={column} label="Last seen" descendingFirst />
  ),
  cell: ({ row }) => {
    const lastSeen = row.original.auth?.lastSeen
    if (!lastSeen)
      return <span className="text-muted-foreground text-xs">-</span>
    const { relative, absolute } = formatRelativeDate(lastSeen)
    return (
      <span
        className="text-muted-foreground text-sm whitespace-nowrap"
        title={absolute}
      >
        {relative}
      </span>
    )
  },
  enableGlobalFilter: false,
}
