'use client'

import type { ColumnDef } from '@tanstack/react-table'
import { RelatedDomainsCell } from '../RelatedDomainsCell'
import type { ReportRow } from '../ReportRow'

export const relatedDomainsColumn: ColumnDef<ReportRow> = {
  id: 'relatedDomains',
  header: () => (
    <div className="text-muted-foreground text-xs font-medium select-none">
      Related Domains
    </div>
  ),
  cell: ({ row }) => (
    <RelatedDomainsCell domains={row.original.relatedDomains} />
  ),
  enableGlobalFilter: false,
}
