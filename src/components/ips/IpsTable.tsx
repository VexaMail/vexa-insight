'use client'

import { DataTable } from '@/components/ui'
import { useListState } from '@/hooks/core'
import { useRouter } from 'next/navigation'
import { useIpsRefresh } from '../../hooks/ips/useIpsRefresh'
import type { IpsTableProps } from './IpsTableProps'
import { getIpsColumns } from './ipsColumns'
import { renderIpsTableToolbar } from './renderIpsTableToolbar'

export default function IpsTable({ ips }: IpsTableProps) {
  const router = useRouter()
  const setScope = useListState((s) => s.setScope)
  const {
    localHostnames,
    localHostnameLookupTimestamps,
    refreshingIps,
    handleRefresh,
  } = useIpsRefresh()
  const columns = getIpsColumns({
    refreshingIps,
    localHostnames,
    localHostnameLookupTimestamps,
    handleRefresh,
    ips,
    setScope,
  })

  if (ips.length === 0) {
    return (
      <div className="glass-card p-8 text-center">
        <p className="text-muted-foreground">
          No IP data yet. Ingest DMARC reports to see IPs.
        </p>
      </div>
    )
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 space-y-4 duration-500">
      <DataTable
        columns={columns}
        data={ips}
        defaultPageSize={25}
        pageSizeOptions={[10, 25, 50, 100, 1000, 'all']}
        onRowClick={(row) => {
          setScope(ips.map((i) => i.ip))
          router.push(`/ips/${encodeURIComponent(row.original.ip)}`)
        }}
        toolbarActions={renderIpsTableToolbar}
      />
    </div>
  )
}
