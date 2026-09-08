import { ipAddresses, normalizedEvents } from '@/lib/db'
import type { IpDateRange } from '@/types/filters'
import type { SQL } from 'drizzle-orm'
import { and, eq, gte, inArray, lte } from 'drizzle-orm'

/**
 * Join condition of the IP detail query: the events belonging to the address,
 * narrowed to the caller's domains and the requested date range.
 */
export function ipDetailEventFilter(
  allowedIds: number[] | null,
  dateRange?: IpDateRange,
): SQL | undefined {
  return and(
    eq(normalizedEvents.ipAddressId, ipAddresses.id),
    allowedIds !== null
      ? inArray(normalizedEvents.domainId, allowedIds)
      : undefined,
    dateRange?.fromTs
      ? gte(normalizedEvents.reportEndDate, dateRange.fromTs)
      : undefined,
    dateRange?.toTs
      ? lte(normalizedEvents.reportEndDate, dateRange.toTs)
      : undefined,
  )
}
