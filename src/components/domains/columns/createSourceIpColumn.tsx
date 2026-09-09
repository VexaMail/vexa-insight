import { IpDisplay } from '@/components/ips'
import { SortableHeaderButton } from '@/components/ui'
import type { ColumnDef } from '@tanstack/react-table'
import type { GetDomainSourcesColumnsParams } from '../GetDomainSourcesColumnsParams'
import type { SourceRow } from '../SourceRow'

/** The sortable source IP column, with the locally refreshed hostname. */
export function createSourceIpColumn({
  localHostnames,
  refreshingIps,
  onRefresh,
}: GetDomainSourcesColumnsParams): ColumnDef<SourceRow> {
  return {
    accessorKey: 'sourceIp',
    header: ({ column }) => (
      <SortableHeaderButton column={column} label="Source IP" />
    ),
    cell: ({ row }) => {
      const countryCode = row.original.countryCode
      const countryName = row.original.countryName || 'Unknown'
      const sourceIp = row.getValue<string>('sourceIp')
      const isRefreshing = refreshingIps.has(sourceIp)
      const localHostname = localHostnames[sourceIp]
      const displayHostname = localHostname ?? row.original.hostname

      return (
        <IpDisplay
          ip={sourceIp}
          countryCode={countryCode ?? null}
          countryName={countryName}
          hostname={displayHostname ?? null}
          layout="stacked"
          showHostname={true}
          isRefreshing={isRefreshing}
          onRefresh={() => {
            onRefresh(sourceIp)
          }}
        />
      )
    },
  }
}
