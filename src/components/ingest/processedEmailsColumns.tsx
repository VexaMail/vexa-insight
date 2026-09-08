import { Button, SortableHeaderButton } from '@/components/ui'
import type { ProcessedEmail } from '@/types/ingest'
import { formatPollStatusTime } from '@/utils/format'
import type { ColumnDef } from '@tanstack/react-table'
import { Eye } from 'lucide-react'
import type { GetProcessedEmailsColumnsParams } from './GetProcessedEmailsColumnsParams'

export function getProcessedEmailsColumns({
  onViewEmail,
}: GetProcessedEmailsColumnsParams): ColumnDef<ProcessedEmail>[] {
  return [
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
    {
      id: 'actions',
      cell: ({ row }) => (
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-foreground h-7 w-7"
          onClick={() => {
            onViewEmail(row.original)
          }}
        >
          <Eye className="h-3.5 w-3.5" />
        </Button>
      ),
      enableGlobalFilter: false,
    },
  ]
}
