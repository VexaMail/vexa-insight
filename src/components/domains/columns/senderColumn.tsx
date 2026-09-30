import { SortableHeaderButton } from '@/components/ui'
import type { dataTableFeatures } from '@/lib/dataTableFeatures'
import { formatSenderCategory } from '@/utils/format'
import type { ColumnDef } from '@tanstack/react-table'
import type { SourceRow } from '../SourceRow'

/** The named sending service behind a source, when it is recognised. */
export const senderColumn: ColumnDef<typeof dataTableFeatures, SourceRow> = {
  id: 'sender',
  accessorFn: (row) => row.sender?.name ?? '',
  header: ({ column }) => (
    <SortableHeaderButton column={column} label="Sender" />
  ),
  cell: ({ row }) => {
    const sender = row.original.sender
    if (!sender) {
      return <span className="text-zinc-400 dark:text-zinc-500">Unknown</span>
    }
    return (
      <div
        className="flex flex-col"
        title={`Matched on ${sender.matchedOn === 'hostname' ? 'reverse DNS' : 'DKIM domain'}`}
      >
        <span className="text-zinc-900 dark:text-zinc-50">{sender.name}</span>
        <span className="text-xs text-zinc-500 dark:text-zinc-400">
          {formatSenderCategory(sender.category)}
        </span>
      </div>
    )
  },
}
