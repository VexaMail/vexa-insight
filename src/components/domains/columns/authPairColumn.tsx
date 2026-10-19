import type { dataTableFeatures } from '@/lib/dataTableFeatures'
import type { ColumnDef } from '@tanstack/react-table'
import { AuthPill } from '../AuthPill'
import type { SourceRow } from '../SourceRow'

/** SPF or DKIM of a source: the auth result and, apart, its alignment. */
export function authPairColumn(
  protocol: 'spf' | 'dkim',
): ColumnDef<typeof dataTableFeatures, SourceRow> {
  const name = protocol.toUpperCase()
  return {
    id: protocol,
    header: () => (
      <span
        className="block text-xs leading-tight whitespace-nowrap"
        title={`${name} authentication result, then whether it aligned with the From domain`}
      >
        {name}
        <span className="text-muted-foreground block text-[11px] font-normal">
          auth / align
        </span>
      </span>
    ),
    cell: ({ row }) => {
      const auth = row.original.auth
      if (!auth)
        return <span className="text-muted-foreground text-xs">No data</span>
      const passed = protocol === 'spf' ? auth.spfAuthPass : auth.dkimAuthPass
      const aligned = protocol === 'spf' ? auth.spfAligned : auth.dkimAligned
      return (
        <div className="flex flex-col items-start gap-1">
          <AuthPill label="auth" pass={passed} total={auth.messages} />
          <AuthPill label="align" pass={aligned} total={auth.messages} />
        </div>
      )
    },
    enableSorting: false,
    enableGlobalFilter: false,
  }
}
