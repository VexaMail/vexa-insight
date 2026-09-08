'use client'

import { SortableHeaderButton } from '@/components/ui'
import type { DomainsTableRow } from '@/types/domains'
import type { ColumnDef } from '@tanstack/react-table'
import { ComplianceBar } from '../ComplianceBar'

export const complianceColumn: ColumnDef<DomainsTableRow> = {
  accessorKey: 'passRatePercent',
  header: ({ column }) => (
    <SortableHeaderButton column={column} label="Compliance" descendingFirst />
  ),
  cell: ({ row }) => <ComplianceBar passRate={row.original.passRatePercent} />,
}
