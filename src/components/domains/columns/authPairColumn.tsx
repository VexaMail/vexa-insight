import type { dataTableFeatures } from '@/lib/dataTableFeatures'
import type { ColumnDef } from '@tanstack/react-table'
import { AlignedAuthCell } from '../AlignedAuthCell'
import type { SourceRow } from '../SourceRow'

/** SPF or DKIM of a source: the aligned result, and the auth one apart. */
export function authPairColumn(
  protocol: 'spf' | 'dkim',
): ColumnDef<typeof dataTableFeatures, SourceRow> {
  const name = protocol.toUpperCase()
  return {
    id: protocol,
    header: () => (
      <span
        className="whitespace-nowrap"
        title={`Whether ${name} passed aligned with the From domain. The authentication result shows under the pill when it differs.`}
      >
        {name} aligned
      </span>
    ),
    cell: ({ row }) => {
      const auth = row.original.auth
      if (!auth)
        return <span className="text-muted-foreground text-xs">No data</span>
      return (
        <AlignedAuthCell
          name={name}
          aligned={protocol === 'spf' ? auth.spfAligned : auth.dkimAligned}
          authPass={protocol === 'spf' ? auth.spfAuthPass : auth.dkimAuthPass}
          total={auth.messages}
        />
      )
    },
    enableSorting: false,
    enableGlobalFilter: false,
  }
}
