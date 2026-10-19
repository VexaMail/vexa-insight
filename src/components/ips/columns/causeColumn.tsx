'use client'

import { SortableHeaderButton } from '@/components/ui'
import type { dataTableFeatures } from '@/lib/dataTableFeatures'
import type { IpSourceRow } from '@/types/ips'
import type { ColumnDef } from '@tanstack/react-table'
import { SourceCausePill } from '../SourceCausePill'

export const causeColumn: ColumnDef<typeof dataTableFeatures, IpSourceRow> = {
  accessorKey: 'cause',
  header: ({ column }) => (
    <SortableHeaderButton column={column} label="Cause" />
  ),
  cell: ({ row }) => <SourceCausePill cause={row.original.cause} />,
}
