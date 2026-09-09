import { readColumnStringFilter, setColumnStringFilter } from '@/utils/ips'
import { useIpsTable } from '../../hooks/ips/useIpsTable'
import { FilterCombobox } from './FilterCombobox'
import type { IpsTableToolbarProps } from './IpsTableToolbarProps'
import { renderCountryFlagIcon } from './renderCountryFlagIcon'

export function IpsTableToolbar({ table }: Readonly<IpsTableToolbarProps>) {
  const { uniqueCountries, uniqueMainDomains } = useIpsTable(table.options.data)

  return (
    <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
      <FilterCombobox
        value={readColumnStringFilter(table, 'countryCode')}
        onChange={(value) => {
          setColumnStringFilter(table, 'countryCode', value)
        }}
        items={uniqueCountries.map((country) => ({
          value: country.code,
          label: country.label,
          code: country.code,
        }))}
        placeholder="All Countries"
        emptyText="No country found."
        renderIcon={renderCountryFlagIcon}
      />

      <FilterCombobox
        value={readColumnStringFilter(table, 'hostname')}
        onChange={(value) => {
          setColumnStringFilter(table, 'hostname', value)
        }}
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
