import { ipAddresses, normalizedEvents } from '@/lib/db'
import type { SQL } from 'drizzle-orm'
import { and, eq, gte, inArray, lte } from 'drizzle-orm'
import type { IpEventConditionsInput } from './IpEventConditionsInput'

/**
 * Where clause of the per-IP event listings: the address, the caller's
 * domains and the requested date range on the given timestamp column.
 */
export function ipEventConditions({
  ip,
  allowedIds,
  dateRange,
  dateColumn,
}: IpEventConditionsInput): SQL | undefined {
  return and(
    eq(ipAddresses.ip, ip),
    allowedIds !== null
      ? inArray(normalizedEvents.domainId, allowedIds)
      : undefined,
    dateRange?.fromTs ? gte(dateColumn, dateRange.fromTs) : undefined,
    dateRange?.toTs ? lte(dateColumn, dateRange.toTs) : undefined,
  )
}
