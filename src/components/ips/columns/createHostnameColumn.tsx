'use client'

import { SortableHeaderButton } from '@/components/ui'
import type { IpSummaryData } from '@/types/ips'
import { mainDomainFilterFn } from '@/utils/ips'
import type { ColumnDef } from '@tanstack/react-table'
import type { GetIpsColumnsParams } from '../GetIpsColumnsParams'
import { IpDisplay } from '../IpDisplay'

export function createHostnameColumn({
  refreshingIps,
  localHostnames,
  localHostnameLookupTimestamps,
  handleRefresh,
}: GetIpsColumnsParams): ColumnDef<IpSummaryData> {
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
        />
      )
    },
    filterFn: mainDomainFilterFn,
  }
}
