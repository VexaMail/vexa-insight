import {
  getDb,
  ipAddresses,
  ipHostnameEnrichments,
  normalizedEvents,
} from '@/lib/db'
import type { IpDateRange } from '@/types/filters'
import type { IpDetailRow } from '@/types/ips'
import { eq } from 'drizzle-orm'
import { ipDetailEventFilter } from './ipDetailEventFilter'
import { ipDetailSelection } from './ipDetailSelection'

/**
 * Aggregated event totals for one IP. The domain filter lives in the LEFT JOIN
 * so a restricted caller gets the address row back with null aggregates rather
 * than no row at all; the caller decides what that means.
 */
export async function queryIpDetailRow(
  ip: string,
  allowedIds: number[] | null,
  dateRange?: IpDateRange,
): Promise<IpDetailRow | null> {
  const rows = await getDb()
    .select(ipDetailSelection)
    .from(ipAddresses)
    .leftJoin(normalizedEvents, ipDetailEventFilter(allowedIds, dateRange))
    .leftJoin(
      ipHostnameEnrichments,
      eq(ipHostnameEnrichments.ip, ipAddresses.ip),
    )
    .where(eq(ipAddresses.ip, ip))
    .groupBy(
      ipAddresses.id,
      ipHostnameEnrichments.hostname,
      ipHostnameEnrichments.lastLookupAt,
    )
    .limit(1)

  return rows[0] ?? null
}
