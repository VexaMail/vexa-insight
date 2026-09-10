'use client'

import { Button } from '@/components/ui'
import type { dataTableFeatures } from '@/lib/dataTableFeatures'
import type { ColumnDef } from '@tanstack/react-table'
import { ExternalLink } from 'lucide-react'
import Link from 'next/link'
import type { GetReportsColumnsParams } from '../GetReportsColumnsParams'
import type { ReportRow } from '../ReportRow'

export function createActionsColumn({
  domainName,
  filtered,
  setScope,
}: GetReportsColumnsParams): ColumnDef<typeof dataTableFeatures, ReportRow> {
  return {
    id: 'actions',
    cell: ({ row }) => {
      const base = `/reports/${String(row.original.id)}`

      return (
        <Link
          href={
            domainName
              ? `${base}?fromDomain=${encodeURIComponent(domainName)}`
              : base
          }
          onClick={() => {
            setScope(filtered.map((r) => r.id.toString()))
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
      )
    },
    enableGlobalFilter: false,
  }
}
