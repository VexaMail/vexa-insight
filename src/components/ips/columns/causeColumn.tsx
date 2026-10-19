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
  cell: ({ row }) => (
    <div className="[&>span]:gap-1 [&>span]:px-1.5">
      <SourceCausePill cause={row.original.cause} />
    </div>
  ),
}
