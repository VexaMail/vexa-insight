'use client'

import { DataTable } from '@/components/ui'
import { useListState } from '@/hooks/core'
import { useRouter } from 'next/navigation'
import { useIpsRefresh } from '../../hooks/ips/useIpsRefresh'
import { getIpsColumns } from './ipsColumns'
import { IpsTableEmpty } from './IpsTableEmpty'
import type { IpsTableProps } from './IpsTableProps'
import { renderIpsTableToolbar } from './renderIpsTableToolbar'

/**
 * The sources table. Below `md` only the first column (a row summary) shows;
 * from `md` up it is hidden and the dense columns show instead.
 */
export default function IpsTable({ ips }: IpsTableProps) {
  const router = useRouter()
  const setScope = useListState((s) => s.setScope)
  const refresh = useIpsRefresh()
  const columns = getIpsColumns({ ...refresh, ips, setScope })

  if (ips.length === 0) return <IpsTableEmpty />

  return (
    <div className="max-md:[&_table]:table-fixed [&_tbody_td]:py-2.5 md:[&_tbody_td:first-child]:hidden max-md:[&_tbody_td:not(:first-child)]:hidden md:[&_th:first-child]:hidden max-md:[&_thead]:hidden">
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
