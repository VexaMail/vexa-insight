import { SortableHeaderButton } from '@/components/ui'
import type { ProcessedEmail } from '@/types/ingest'
import { formatPollStatusTime } from '@/utils/format'
import type { ColumnDef } from '@tanstack/react-table'

/** The read-only columns of the processed emails table. */
export const processedEmailInfoColumns: ColumnDef<ProcessedEmail>[] = [
  {
    accessorKey: 'processedAt',
    header: ({ column }) => (
      <SortableHeaderButton column={column} label="Processed At" />
    ),
    cell: ({ row }) => (
      <span className="text-foreground text-sm">
        {formatPollStatusTime(row.getValue('processedAt'))}
      </span>
    ),
    sortingFn: 'datetime',
  },
  {
    accessorKey: 'messageId',
    header: ({ column }) => (
      <SortableHeaderButton column={column} label="Message ID" />
    ),
    cell: ({ row }) => (
      <span className="text-muted-foreground max-w-xs truncate font-mono text-xs">
        {row.getValue('messageId')}
      </span>
    ),
  },
  {
    accessorKey: 'accountLabel',
    header: ({ column }) => (
      <SortableHeaderButton column={column} label="Account" />
    ),
    cell: ({ row }) => (
      <span className="text-muted-foreground text-sm">
        {row.original.accountLabel ?? '—'}
      </span>
    ),
  },
]
