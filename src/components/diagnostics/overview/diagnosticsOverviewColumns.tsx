import { SortableHeaderButton } from '@/components/ui'
import type { dataTableFeatures } from '@/lib/dataTableFeatures'
import type { DiagnosticsOverviewRow } from '@/types/diagnostics'
import { countActionableFindings } from '@/utils/diagnostics'
import { formatRunAt } from '@/utils/format'
import type { ColumnDef } from '@tanstack/react-table'
import { OverviewDomainLink } from './OverviewDomainLink'
import { OverviewProtocols } from './OverviewProtocols'
import { OverviewScore } from './OverviewScore'

/** Domain, score, protocol states, findings that need action and run time. */
export const diagnosticsOverviewColumns: ColumnDef<
  typeof dataTableFeatures,
  DiagnosticsOverviewRow
>[] = [
  {
    id: 'domain',
    accessorKey: 'domainName',
    header: ({ column }) => (
      <SortableHeaderButton column={column} label="Domain" />
    ),
    cell: ({ row }) => <OverviewDomainLink row={row.original} />,
  },
  {
    id: 'score',
    // A domain without a DNS answer has no score: it sorts after every
    // scored one when the lowest scores come first.
    accessorFn: (row) => (row.resolved ? row.score.percentage : 101),
    header: ({ column }) => (
      <SortableHeaderButton column={column} label="Score" />
    ),
    cell: ({ row }) => <OverviewScore row={row.original} />,
    enableGlobalFilter: false,
  },
  {
    id: 'protocols',
    header: 'Protocols',
    cell: ({ row }) => <OverviewProtocols row={row.original} />,
    enableSorting: false,
  },
  {
    id: 'needAction',
    accessorFn: (row) => countActionableFindings(row.findings),
    header: ({ column }) => (
      <SortableHeaderButton column={column} label="To fix" descendingFirst />
    ),
    cell: ({ getValue }) => (
      <span className="text-muted-foreground font-mono text-xs tabular-nums">
        {String(getValue())}
      </span>
    ),
    enableGlobalFilter: false,
  },
  {
    id: 'checkedAt',
    accessorKey: 'checkedAt',
    header: ({ column }) => (
      <SortableHeaderButton column={column} label="Last checked" />
    ),
    cell: ({ row }) => (
      <time
        dateTime={row.original.checkedAt}
        className="text-muted-foreground font-mono text-xs whitespace-nowrap"
      >
        {formatRunAt(new Date(row.original.checkedAt))}
      </time>
    ),
    enableGlobalFilter: false,
  },
]
