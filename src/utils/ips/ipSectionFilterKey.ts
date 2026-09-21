import type { IpDateRange } from '@/types/filters'

/** Identity of an IP detail list: the address plus the active date range. */
export function ipSectionFilterKey(ip: string, dateRange: IpDateRange): string {
  return `${ip}|${String(dateRange.fromTs ?? '')}|${String(dateRange.toTs ?? '')}`
}
