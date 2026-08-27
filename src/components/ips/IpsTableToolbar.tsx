import type { IpSummaryData } from '@/types/ips'
import type { Table } from '@tanstack/react-table'
import ReactCountryFlag from 'react-country-flag'
import { useIpsTable } from '../../hooks/ips/useIpsTable'
import { FilterCombobox } from './FilterCombobox'

export function IpsTableToolbar({
  table,
}: Readonly<{ table: Table<IpSummaryData> }>) {
  const { uniqueCountries, uniqueMainDomains } = useIpsTable(table.options.data)
  const countryFilterValue = table.getColumn('countryCode')?.getFilterValue()
  const countryFilter =
    typeof countryFilterValue === 'string' ? countryFilterValue : 'All'
  const domainFilterValue = table.getColumn('hostname')?.getFilterValue()
  const domainFilter =
    typeof domainFilterValue === 'string' ? domainFilterValue : 'All'

  return (
    <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
      <FilterCombobox
        value={countryFilter}
        onChange={(value) =>
          table
            .getColumn('countryCode')
            ?.setFilterValue(value === 'All' ? undefined : value)
        }
        items={uniqueCountries.map((country) => ({
          value: country.code,
          label: country.label,
          code: country.code,
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
        onChange={(value) =>
          table
            .getColumn('hostname')
            ?.setFilterValue(value === 'All' ? undefined : value)
        }
        items={uniqueMainDomains.map((domain) => ({
          value: domain,
          label: domain,
        }))}
        placeholder="All Domains"
        emptyText="No domain found."
      />
    </div>
  )
}
