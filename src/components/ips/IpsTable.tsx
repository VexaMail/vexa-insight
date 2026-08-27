'use client'

import { DataTable } from '@/components/ui'
import { useListState } from '@/hooks/core'
import { useRouter } from 'next/navigation'
import ReactCountryFlag from 'react-country-flag'
import { useIpsRefresh } from '../../hooks/ips/useIpsRefresh'
import { useIpsTable } from '../../hooks/ips/useIpsTable'
import { FilterCombobox } from './FilterCombobox'
import type { IpsTableProps } from './IpsTableProps'
import { getIpsColumns } from './ipsColumns'

export default function IpsTable({ ips }: IpsTableProps) {
  const router = useRouter()
  const setScope = useListState((s) => s.setScope)
  const {
    localHostnames,
    localHostnameLookupTimestamps,
    refreshingIps,
    handleRefresh,
  } = useIpsRefresh()
  const { uniqueCountries, uniqueMainDomains } = useIpsTable(ips)

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
        toolbarActions={(table) => {
          const countryFilterValue = table
            .getColumn('countryCode')
            ?.getFilterValue()
          const countryFilter =
            typeof countryFilterValue === 'string' ? countryFilterValue : 'All'
          const domainFilterValue = table
            .getColumn('hostname')
            ?.getFilterValue()
          const domainFilter =
            typeof domainFilterValue === 'string' ? domainFilterValue : 'All'

          return (
            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <FilterCombobox
                value={countryFilter}
                onChange={(val) =>
                  table
                    .getColumn('countryCode')
                    ?.setFilterValue(val === 'All' ? undefined : val)
                }
                items={uniqueCountries.map((c) => ({
                  value: c.code,
                  label: c.label,
                  code: c.code,
                }))}
                placeholder="All Countries"
                emptyText="No country found."
                renderIcon={(code) => (
                  <ReactCountryFlag
                    countryCode={code}
                    svg
                    style={{ width: '1.2em', height: '1.2em', flexShrink: 0 }}
                  />
                )}
              />

              <FilterCombobox
                value={domainFilter}
                onChange={(val) =>
                  table
                    .getColumn('hostname')
                    ?.setFilterValue(val === 'All' ? undefined : val)
                }
                items={uniqueMainDomains.map((d) => ({
                  value: d,
                  label: d,
                }))}
                placeholder="All Domains"
                emptyText="No domain found."
              />
            </div>
          )
        }}
      />
    </div>
  )
}
