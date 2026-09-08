import {
  getDb,
  ipAddresses,
  normalizedEventPolicyOverrides,
  normalizedEvents,
} from '@/lib/db'
import { eq } from 'drizzle-orm'

/**
 * Policy override types per source IP of one report. Distinct (ip, type) pairs
 * are deduplicated in SQL, so two rows of the same IP share one union.
 */
export async function queryOverrideTypesByIp(
  rawReportId: number,
): Promise<Map<string, string[]>> {
  const rows = await getDb()
    .select({
      ip: ipAddresses.ip,
      type: normalizedEventPolicyOverrides.type,
    })
    .from(normalizedEventPolicyOverrides)
    .innerJoin(
      normalizedEvents,
      eq(normalizedEventPolicyOverrides.eventId, normalizedEvents.id),
    )
    .innerJoin(ipAddresses, eq(normalizedEvents.ipAddressId, ipAddresses.id))
    .where(eq(normalizedEvents.rawReportId, rawReportId))
    .groupBy(ipAddresses.ip, normalizedEventPolicyOverrides.type)

  const byIp = new Map<string, string[]>()
  for (const row of rows) {
    const existing = byIp.get(row.ip)
    if (existing) {
      existing.push(row.type)
    } else {
      byIp.set(row.ip, [row.type])
    }
  }
  return byIp
}
