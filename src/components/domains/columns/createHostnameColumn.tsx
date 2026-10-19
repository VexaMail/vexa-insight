import { SortableHeaderButton } from '@/components/ui'
import type { dataTableFeatures } from '@/lib/dataTableFeatures'
import type { ColumnDef } from '@tanstack/react-table'
import type { GetDomainSourcesColumnsParams } from '../GetDomainSourcesColumnsParams'
import { HostnameCell } from '../HostnameCell'
import type { SourceRow } from '../SourceRow'

/** Reverse DNS of the source, refreshable in place. */
export function createHostnameColumn({
  localHostnames,
  refreshingIps,
  onRefresh,
}: GetDomainSourcesColumnsParams): ColumnDef<
  typeof dataTableFeatures,
  SourceRow
> {
  return {
    id: 'hostname',
    accessorFn: (row) => localHostnames[row.sourceIp] ?? row.hostname ?? '',
    header: ({ column }) => (
      <SortableHeaderButton column={column} label="Hostname" />
    ),
    cell: ({ row }) => {
      const ip = row.original.sourceIp
      return (
        <HostnameCell
          hostname={localHostnames[ip] ?? row.original.hostname ?? null}
          isRefreshing={refreshingIps.has(ip)}
          onRefresh={() => {
            onRefresh(ip)
          }}
        />
      )
    },
  }
}
