import { SortableHeaderButton } from '@/components/ui'
import type { dataTableFeatures } from '@/lib/dataTableFeatures'
import type { ColumnDef } from '@tanstack/react-table'
import { DmarcResultPill } from '../DmarcResultPill'
import type { SourceRow } from '../SourceRow'

/** The DMARC result of a source: SPF or DKIM passed aligned. */
export const dmarcColumn: ColumnDef<typeof dataTableFeatures, SourceRow> = {
  id: 'dmarc',
  accessorFn: (row) =>
    row.auth ? row.auth.dmarcPass / Math.max(row.auth.messages, 1) : -1,
  header: ({ column }) => (
    <SortableHeaderButton column={column} label="DMARC" />
  ),
  cell: ({ row }) => {
    const auth = row.original.auth
    if (!auth)
      return <span className="text-muted-foreground text-xs">No data</span>
    return <DmarcResultPill pass={auth.dmarcPass} total={auth.messages} />
  },
  enableGlobalFilter: false,
}
