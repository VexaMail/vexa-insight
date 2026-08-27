import { IpDisplay } from '@/components/ips'
import { SortIcon } from '@/components/ui'
import type { ColumnDef } from '@tanstack/react-table'
import type { GetDomainSourcesColumnsParams } from './GetDomainSourcesColumnsParams'
import type { SourceRow } from './SourceRow'

export function getDomainSourcesColumns({
  localHostnames,
  refreshingIps,
  onRefresh,
}: GetDomainSourcesColumnsParams): ColumnDef<SourceRow>[] {
  return [
    {
      accessorKey: 'sourceIp',
      header: ({ column }) => {
        const isSorted = column.getIsSorted()
        return (
          <button
            type="button"
            className="flex cursor-pointer items-center gap-1 bg-transparent p-0 text-left select-none"
            onClick={() => {
              column.toggleSorting(isSorted === 'asc')
            }}
          >
            Source IP
            <SortIcon
              active={isSorted !== false}
              dir={isSorted === 'asc' ? 'asc' : 'desc'}
            />
          </button>
        )
      },
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
    },
    {
      accessorKey: 'count',
      header: ({ column }) => {
        const isSorted = column.getIsSorted()
        return (
          <button
            type="button"
            className="flex cursor-pointer items-center gap-1 bg-transparent p-0 text-left select-none"
            onClick={() => {
              column.toggleSorting(isSorted === 'asc')
            }}
          >
            Count
            <SortIcon
              active={isSorted !== false}
              dir={isSorted === 'asc' ? 'asc' : 'desc'}
            />
          </button>
        )
      },
      cell: ({ row }) => {
        const val = row.original.count
        return (
          <span className="text-zinc-600 dark:text-zinc-400">
            {val.toLocaleString()}
          </span>
        )
      },
    },
  ]
}
