'use client'

import { SortableHeaderButton } from '@/components/ui'
import type { dataTableFeatures } from '@/lib/dataTableFeatures'
import type { IpSourceRow } from '@/types/ips'
import { mainDomainFilterFn } from '@/utils/ips'
import type { ColumnDef } from '@tanstack/react-table'
import type { GetIpsColumnsParams } from '../GetIpsColumnsParams'
import { IpDisplay } from '../IpDisplay'

export function createHostnameColumn({
  refreshingIps,
  localHostnames,
  localHostnameLookupTimestamps,
  handleRefresh,
}: GetIpsColumnsParams): ColumnDef<typeof dataTableFeatures, IpSourceRow> {
  return {
    accessorKey: 'hostname',
    header: ({ column }) => (
      <SortableHeaderButton column={column} label="Hostname" />
    ),
    cell: ({ row }) => {
      const ip = row.getValue<string>('ip')

      return (
        <IpDisplay
          ip={ip}
          hostname={localHostnames[ip] ?? row.getValue<string>('hostname')}
          hostnameLastLookupAt={
            localHostnameLookupTimestamps[ip] ??
            row.original.hostnameLastLookupAt
          }
          layout="none"
          showFlag={false}
          showIp={false}
          isRefreshing={refreshingIps.has(ip)}
          onRefresh={handleRefresh}
          className="max-w-[15rem] overflow-hidden font-mono text-[13px]"
        />
      )
    },
    filterFn: mainDomainFilterFn,
  }
}
