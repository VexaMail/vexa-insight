'use client'

import { SortableHeaderButton } from '@/components/ui'
import type { dataTableFeatures } from '@/lib/dataTableFeatures'
import type { DomainsTableRow } from '@/types/domains'
import type { ColumnDef } from '@tanstack/react-table'
import { DomainNameCell } from '../DomainNameCell'

export const domainNameColumn: ColumnDef<
  typeof dataTableFeatures,
  DomainsTableRow
> = {
  accessorKey: 'domainName',
  header: ({ column }) => (
    <SortableHeaderButton column={column} label="Domain" />
  ),
  cell: ({ row }) => <DomainNameCell domainName={row.original.domainName} />,
}
