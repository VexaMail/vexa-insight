import { Button, SortIcon } from '@/components/ui'

import { formatPollStatusTime } from '@/utils/format'
import type { ColumnDef } from '@tanstack/react-table'
import { Eye } from 'lucide-react'
import type { ProcessedEmail } from '../../types/ingest/ProcessedEmail'
import type { GetProcessedEmailsColumnsParams } from './GetProcessedEmailsColumnsParams'

export function getProcessedEmailsColumns({
  onViewEmail,
}: GetProcessedEmailsColumnsParams): ColumnDef<ProcessedEmail>[] {
  return [
    {
      accessorKey: 'processedAt',
      header: ({ column }) => {
        const isSorted = column.getIsSorted()
        return (
          <div
            className="flex cursor-pointer items-center gap-1 select-none"
            onClick={() => column.toggleSorting(isSorted === 'asc')}
          >
            Processed At
            <SortIcon
              active={isSorted !== false}
              dir={isSorted === 'asc' ? 'asc' : 'desc'}
            />
          </div>
        )
      },
      cell: ({ row }) => (
        <span className="text-foreground text-sm">
          {formatPollStatusTime(row.getValue('processedAt'))}
        </span>
      ),
      sortingFn: 'datetime',
    },
    {
      accessorKey: 'messageId',
      header: ({ column }) => {
        const isSorted = column.getIsSorted()
        return (
          <div
            className="flex cursor-pointer items-center gap-1 select-none"
            onClick={() => column.toggleSorting(isSorted === 'asc')}
          >
            Message ID
            <SortIcon
              active={isSorted !== false}
              dir={isSorted === 'asc' ? 'asc' : 'desc'}
            />
          </div>
        )
      },
      cell: ({ row }) => (
        <span className="text-muted-foreground max-w-xs truncate font-mono text-xs">
          {row.getValue('messageId')}
        </span>
      ),
    },
    {
      accessorKey: 'accountLabel',
      header: ({ column }) => {
        const isSorted = column.getIsSorted()
        return (
          <div
            className="flex cursor-pointer items-center gap-1 select-none"
            onClick={() => column.toggleSorting(isSorted === 'asc')}
          >
            Account
            <SortIcon
              active={isSorted !== false}
              dir={isSorted === 'asc' ? 'asc' : 'desc'}
            />
          </div>
        )
      },
      cell: ({ row }) => {
        const val = row.getValue('accountLabel') as string | null
        return (
          <span className="text-muted-foreground text-sm">{val ?? '—'}</span>
        )
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-foreground h-7 w-7"
          onClick={() => onViewEmail(row.original)}
        >
          <Eye className="h-3.5 w-3.5" />
        </Button>
      ),
      enableGlobalFilter: false,
    },
  ]
}
