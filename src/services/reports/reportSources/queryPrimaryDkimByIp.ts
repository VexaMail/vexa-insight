import {
  getDb,
  ipAddresses,
  normalizedEventDkimResults,
  normalizedEvents,
} from '@/lib/db'
import { asc, eq } from 'drizzle-orm'

/**
 * First DKIM identity seen per source IP of one report. Ordered by event then
 * result id, so "first" is deterministic across runs.
 */
export async function queryPrimaryDkimByIp(
  rawReportId: number,
): Promise<Map<string, { domain: string; selector: string }>> {
  const rows = await getDb()
    .select({
      ip: ipAddresses.ip,
      domain: normalizedEventDkimResults.domain,
      selector: normalizedEventDkimResults.selector,
    })
    .from(normalizedEventDkimResults)
    .innerJoin(
      normalizedEvents,
      eq(normalizedEventDkimResults.eventId, normalizedEvents.id),
    )
    .innerJoin(ipAddresses, eq(normalizedEvents.ipAddressId, ipAddresses.id))
    .where(eq(normalizedEvents.rawReportId, rawReportId))
    .orderBy(asc(normalizedEvents.id), asc(normalizedEventDkimResults.id))

  const byIp = new Map<string, { domain: string; selector: string }>()
  for (const row of rows) {
    if (!byIp.has(row.ip)) {
      byIp.set(row.ip, { domain: row.domain, selector: row.selector })
    }
  }
  return byIp
}
