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
      return <span className="text-muted-foreground text-sm">Unknown</span>
    }
    return (
      <div
        className="flex max-w-[9rem] flex-col"
        title={`Matched on ${sender.matchedOn === 'hostname' ? 'reverse DNS' : 'DKIM domain'}`}
      >
        <span className="text-foreground text-sm">{sender.name}</span>
        <span className="text-muted-foreground text-xs">
          {formatSenderCategory(sender.category)}
        </span>
      </div>
    )
  },
}
