'use client'

import { Badge, Button } from '@/components/ui'
import { cn } from '@/lib/utils'
import type { DomainsTableRow } from '@/types/domains'
import { getDomainStatus } from '@/utils/domains'
import type { ColumnDef } from '@tanstack/react-table'
import { Activity, ArrowDown, ArrowUp, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { getComplianceStyles } from './getComplianceStyles'
import type { GetDomainsColumnsParams } from './GetDomainsColumnsParams'

export function getDomainsColumns({
  setScope,
  filtered,
}: GetDomainsColumnsParams): ColumnDef<DomainsTableRow>[] {
  return [
    {
      accessorKey: 'domainName',
      header: ({ column }) => (
        <div
          className="flex cursor-pointer items-center gap-1 select-none"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Domain
          {column.getIsSorted() === 'asc' && (
            <ArrowUp className="text-primary ml-1 h-3 w-3" />
          )}
          {column.getIsSorted() === 'desc' && (
            <ArrowDown className="text-primary ml-1 h-3 w-3" />
          )}
          {!column.getIsSorted() && (
            <ArrowDown className="text-muted-foreground/30 ml-1 h-3 w-3" />
          )}
        </div>
      ),
      cell: ({ row }) => (
        <span className="text-foreground text-sm font-medium">
          {row.getValue('domainName')}
        </span>
      ),
    },
    {
      accessorKey: 'totalMessages',
      header: ({ column }) => (
        <div
          className="flex cursor-pointer items-center gap-1 select-none"
          onClick={() => column.toggleSorting(column.getIsSorted() !== 'desc')}
        >
          Messages
          {column.getIsSorted() === 'asc' && (
            <ArrowUp className="text-primary ml-1 h-3 w-3" />
          )}
          {column.getIsSorted() === 'desc' && (
            <ArrowDown className="text-primary ml-1 h-3 w-3" />
          )}
          {!column.getIsSorted() && (
            <ArrowDown className="text-muted-foreground/30 ml-1 h-3 w-3" />
          )}
        </div>
      ),
      cell: ({ row }) => (
        <span className="text-muted-foreground text-sm">
          {(row.getValue('totalMessages') as number).toLocaleString()}
        </span>
      ),
    },
    {
      accessorKey: 'passRatePercent',
      header: ({ column }) => (
        <div
          className="flex cursor-pointer items-center gap-1 select-none"
          onClick={() => column.toggleSorting(column.getIsSorted() !== 'desc')}
        >
          Compliance
          {column.getIsSorted() === 'asc' && (
            <ArrowUp className="text-primary ml-1 h-3 w-3" />
          )}
          {column.getIsSorted() === 'desc' && (
            <ArrowDown className="text-primary ml-1 h-3 w-3" />
          )}
          {!column.getIsSorted() && (
            <ArrowDown className="text-muted-foreground/30 ml-1 h-3 w-3" />
          )}
        </div>
      ),
      cell: ({ row }) => {
        const passRate = row.getValue('passRatePercent') as number
        const { textColor, barColor } = getComplianceStyles(passRate)

        return (
          <div className="flex min-w-[140px] items-center gap-3">
            <div className="bg-secondary h-1.5 flex-1 overflow-hidden rounded-full">
              <div
                className={cn('h-full rounded-full', barColor)}
                style={{ width: `${passRate}%` }}
              />
            </div>
            <span
              className={cn('w-12 text-right text-xs font-semibold', textColor)}
            >
              {passRate.toFixed(1)}%
            </span>
          </div>
        )
      },
    },
    {
      id: 'status',
      accessorFn: (row) => getDomainStatus(row.passRatePercent),
      header: ({ column }) => (
        <div
          className="flex cursor-pointer items-center gap-1 select-none"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Status
          {column.getIsSorted() === 'asc' && (
            <ArrowUp className="text-primary ml-1 h-3 w-3" />
          )}
          {column.getIsSorted() === 'desc' && (
            <ArrowDown className="text-primary ml-1 h-3 w-3" />
          )}
          {!column.getIsSorted() && (
            <ArrowDown className="text-muted-foreground/30 ml-1 h-3 w-3" />
          )}
        </div>
      ),
      cell: ({ row }) => {
        const passRate = row.original.passRatePercent
        const { statusLabel, statusClass } = getComplianceStyles(passRate)

        return (
          <Badge variant="outline" className={statusClass}>
            {statusLabel}
          </Badge>
        )
      },
      enableGlobalFilter: false,
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const { domainName } = row.original
        return (
          <div className="flex items-center gap-1">
            <Link
              href={`/diagnostics/${domainName}`}
              onClick={(e) => e.stopPropagation()}
              title="Diagnostics"
            >
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground h-7 w-7"
              >
                <Activity className="h-3.5 w-3.5" />
              </Button>
            </Link>
            <Link
              href={`/domains/${domainName}`}
              onClick={(e) => {
                e.stopPropagation()
                setScope(filtered.map((d) => d.domainName))
              }}
              title="Domain detail"
            >
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground h-7 w-7"
              >
                <ExternalLink className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        )
      },
      enableGlobalFilter: false,
    },
  ]
}
