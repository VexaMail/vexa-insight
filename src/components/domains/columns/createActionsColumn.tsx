'use client'

import type { DomainsTableRow } from '@/types/domains'
import type { ColumnDef } from '@tanstack/react-table'
import { Activity, ExternalLink } from 'lucide-react'
import { DomainRowAction } from '../DomainRowAction'
import type { GetDomainsColumnsParams } from '../GetDomainsColumnsParams'

export function createActionsColumn({
  setScope,
  filtered,
}: GetDomainsColumnsParams): ColumnDef<DomainsTableRow> {
  return {
    id: 'actions',
    cell: ({ row }) => {
      const { domainName } = row.original

      return (
        <div className="flex items-center gap-1">
          <DomainRowAction
            href={`/diagnostics/${domainName}`}
            title="Diagnostics"
            icon={<Activity className="h-3.5 w-3.5" />}
          />
          <DomainRowAction
            href={`/domains/${domainName}`}
            title="Domain detail"
            icon={<ExternalLink className="h-3.5 w-3.5" />}
            onNavigate={() => {
              setScope(filtered.map((d) => d.domainName))
            }}
          />
        </div>
      )
    },
    enableGlobalFilter: false,
  }
}
