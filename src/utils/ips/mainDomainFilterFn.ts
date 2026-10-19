import type { dataTableFeatures } from '@/lib/dataTableFeatures'
import type { IpSourceRow } from '@/types/ips'
import type { FilterFn } from '@tanstack/react-table'

export const mainDomainFilterFn: FilterFn<
  typeof dataTableFeatures,
  IpSourceRow
> = (row, columnId, filterValue: string) => {
  if (!filterValue || filterValue === 'All') return true
  const hostname = row.getValue<string>(columnId)
  if (!hostname) return false

  return hostname === filterValue || hostname.endsWith(`.${filterValue}`)
}
