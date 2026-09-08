'use client'

import { SortableHeaderButton } from '@/components/ui'
import type { DomainsTableRow } from '@/types/domains'
import type { ColumnDef } from '@tanstack/react-table'

export const domainNameColumn: ColumnDef<DomainsTableRow> = {
  accessorKey: 'domainName',
  header: ({ column }) => (
    <SortableHeaderButton column={column} label="Domain" />
  ),
  cell: ({ row }) => (
    <span className="text-foreground text-sm font-medium">
      {row.getValue('domainName')}
    </span>
  ),
}
