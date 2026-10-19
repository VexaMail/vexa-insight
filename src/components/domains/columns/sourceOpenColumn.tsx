import type { dataTableFeatures } from '@/lib/dataTableFeatures'
import type { ColumnDef } from '@tanstack/react-table'
import { ExternalLink } from 'lucide-react'
import Link from 'next/link'
import type { SourceRow } from '../SourceRow'

/** Link to the source's own page: related domains, reports and timeline. */
export const sourceOpenColumn: ColumnDef<typeof dataTableFeatures, SourceRow> =
  {
    id: 'open',
    header: () => <span className="sr-only">Open</span>,
    cell: ({ row }) => (
      <Link
        href={`/ips/${encodeURIComponent(row.original.sourceIp)}`}
        aria-label={`Open source ${row.original.sourceIp}`}
        className="text-muted-foreground hover:text-foreground hover:bg-accent inline-flex h-8 w-8 items-center justify-center rounded-md transition-colors duration-150"
      >
        <ExternalLink className="h-3.5 w-3.5" />
      </Link>
    ),
    enableSorting: false,
    enableGlobalFilter: false,
  }
