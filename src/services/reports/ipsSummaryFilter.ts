import { normalizedEvents } from '@/lib/db'
import type { IpDateRange } from '@/types/filters'
import type { SQL } from 'drizzle-orm'
import { and, gte, inArray, lte } from 'drizzle-orm'

/** Where clause of the IP list: the caller's domains and the date range. */
export function ipsSummaryFilter(
  allowedIds: number[] | null,
  dateRange?: IpDateRange,
): SQL | undefined {
  return and(
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
