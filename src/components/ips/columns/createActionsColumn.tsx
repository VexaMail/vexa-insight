'use client'

import { Button } from '@/components/ui'
import type { IpSummaryData } from '@/types/ips'
import type { ColumnDef } from '@tanstack/react-table'
import { ExternalLink } from 'lucide-react'
import Link from 'next/link'
import type { GetIpsColumnsParams } from '../GetIpsColumnsParams'

export function createActionsColumn({
  ips,
  setScope,
}: GetIpsColumnsParams): ColumnDef<IpSummaryData> {
  return {
    id: 'actions',
    cell: ({ row }) => (
      <Link
        href={`/ips/${encodeURIComponent(row.original.ip)}`}
        onClick={(e) => {
          e.stopPropagation()
          setScope(ips.map((i) => i.ip))
        }}
      >
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-foreground h-7 w-7"
        >
          <ExternalLink className="h-3.5 w-3.5" />
        </Button>
      </Link>
    ),
    enableGlobalFilter: false,
  }
}
