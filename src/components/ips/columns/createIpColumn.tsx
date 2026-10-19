'use client'

import { SortableHeaderButton } from '@/components/ui'
import type { dataTableFeatures } from '@/lib/dataTableFeatures'
import type { IpSourceRow } from '@/types/ips'
import type { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
import type { GetIpsColumnsParams } from '../GetIpsColumnsParams'

/** The IP, in mono, linking to the source's page. */
export function createIpColumn({
  ips,
  setScope,
}: GetIpsColumnsParams): ColumnDef<typeof dataTableFeatures, IpSourceRow> {
  return {
    accessorKey: 'ip',
    header: ({ column }) => (
      <SortableHeaderButton column={column} label="IP address" />
    ),
    cell: ({ row }) => (
      <Link
        href={`/ips/${encodeURIComponent(row.original.ip)}`}
        onClick={(e) => {
          e.stopPropagation()
          setScope(ips.map((i) => i.ip))
        }}
        className="text-foreground hover:text-primary font-mono text-[13px] whitespace-nowrap transition-colors duration-150"
      >
        {row.original.ip}
      </Link>
    ),
  }
}
