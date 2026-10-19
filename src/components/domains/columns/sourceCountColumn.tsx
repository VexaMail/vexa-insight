import { SortableHeaderButton } from '@/components/ui'
import type { dataTableFeatures } from '@/lib/dataTableFeatures'
import type { ColumnDef } from '@tanstack/react-table'
import type { SourceRow } from '../SourceRow'

export const sourceCountColumn: ColumnDef<typeof dataTableFeatures, SourceRow> =
  {
    accessorKey: 'count',
    header: ({ column }) => (
      <SortableHeaderButton column={column} label="Volume" descendingFirst />
    ),
    cell: ({ row }) => (
      <span className="text-foreground block text-right font-mono text-sm tabular-nums">
        {row.original.count.toLocaleString('en-US')}
      </span>
    ),
    enableGlobalFilter: false,
  }
