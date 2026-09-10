import { Button } from '@/components/ui'
import type { dataTableFeatures } from '@/lib/dataTableFeatures'
import type { ProcessedEmail } from '@/types/ingest'
import type { ColumnDef } from '@tanstack/react-table'
import { Eye } from 'lucide-react'

export function createProcessedEmailActionsColumn(
  onViewEmail: (email: ProcessedEmail) => void,
): ColumnDef<typeof dataTableFeatures, ProcessedEmail> {
  return {
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
  }
}
