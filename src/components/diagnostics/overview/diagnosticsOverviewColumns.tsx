import { SortableHeaderButton } from '@/components/ui'
import type { dataTableFeatures } from '@/lib/dataTableFeatures'
import type { DiagnosticsOverviewRow } from '@/types/diagnostics'
import { countActionableFindings } from '@/utils/diagnostics'
import type { ColumnDef } from '@tanstack/react-table'
import { OverviewCheckedAt } from './OverviewCheckedAt'
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
    // A domain without a DNS answer has no score, and one not checked yet has
    // nothing at all: both sort after every scored one, lowest first.
    accessorFn: (row) =>
      row.check ? (row.check.resolved ? row.check.percentage : 101) : 102,
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
    accessorFn: (row) =>
      row.check ? countActionableFindings(row.check.protocols) : -1,
    header: ({ column }) => (
      <SortableHeaderButton column={column} label="To fix" descendingFirst />
    ),
    cell: ({ getValue }) => (
      <span className="text-muted-foreground font-mono text-xs tabular-nums">
        {getValue<number>() < 0 ? '—' : String(getValue())}
      </span>
    ),
    enableGlobalFilter: false,
  },
  {
    id: 'checkedAt',
    accessorFn: (row) => row.check?.checkedAt ?? '',
    header: ({ column }) => (
      <SortableHeaderButton column={column} label="Last checked" />
    ),
    cell: ({ row }) => (
      <span className="text-muted-foreground text-xs whitespace-nowrap">
        <OverviewCheckedAt row={row.original} />
      </span>
    ),
    enableGlobalFilter: false,
  },
]
