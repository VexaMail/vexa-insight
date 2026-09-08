import {
  getDb,
  ipAddresses,
  ipHostnameEnrichments,
  normalizedEvents,
} from '@/lib/db'
import type { IpDateRange } from '@/types/filters'
import type { IpDetailRow } from '@/types/ips'
import { desc, eq, sql } from 'drizzle-orm'
import { ipDetailSelection } from './ipDetailSelection'
import { ipsSummaryFilter } from './ipsSummaryFilter'

/**
 * Aggregated totals of every IP that sent inside the range, busiest first.
 * The join is inner, so an address with no matching event is left out.
 */
export async function queryIpsSummaryRows(
  allowedIds: number[] | null,
  dateRange?: IpDateRange,
): Promise<IpDetailRow[]> {
  return getDb()
    .select(ipDetailSelection)
    .from(ipAddresses)
    .innerJoin(
      normalizedEvents,
      eq(normalizedEvents.ipAddressId, ipAddresses.id),
    )
    .leftJoin(
      ipHostnameEnrichments,
      eq(ipHostnameEnrichments.ip, ipAddresses.ip),
    )
    .where(ipsSummaryFilter(allowedIds, dateRange))
    .groupBy(
      ipAddresses.id,
      ipHostnameEnrichments.hostname,
      ipHostnameEnrichments.lastLookupAt,
    )
    .orderBy(desc(sql`total_messages`))
}
