import { getDb, ipAddresses, ipHostnameEnrichments } from '@/lib/db'
import { normalizeIp } from '@/utils/geoip'
import { eq, inArray } from 'drizzle-orm'
import { geoip } from './geoip'
import { THIRTY_DAYS_MS } from './thirtyDaysMs'

/**
 * Upserts many IPs in a handful of set-based statements and returns a
 * value -> id map for the caller to join events against.
 *
 * This replaces the per-IP `await upsertIp(ip)` loop that ran one SELECT plus
 * one INSERT/UPDATE per address. For a report with N unique senders that was
 * 2N sequential round-trips; here it is one pending-lookup insert, one existing
 * lookup, one new-row insert, and one fresh-row touch, plus an individual
 * refresh only for the rare stale rows (location older than 30 days).
 *
 * Behavior matches `upsertIp`: new rows get a geoip country and seed
 * timestamps, stale rows re-resolve the country, fresh rows only bump
 * lastSeenAt, and every IP is scheduled for background hostname enrichment.
 */
export async function upsertIpsBatch(
  ips: readonly string[],
): Promise<Map<string, number>> {
  const db = getDb()
  const normalized = [...new Set(ips.map(normalizeIp).filter(Boolean))]
  const result = new Map<string, number>()
  if (normalized.length === 0) return result

  await db
    .insert(ipHostnameEnrichments)
    .values(normalized.map((ip) => ({ ip, lookupStatus: 'pending' as const })))
    .onConflictDoNothing({ target: ipHostnameEnrichments.ip })

  const now = new Date()
  const existingRows = await db
    .select()
    .from(ipAddresses)
    .where(inArray(ipAddresses.ip, normalized))
  const existingIps = new Set(existingRows.map((row) => row.ip))

  const newIps = normalized.filter((ip) => !existingIps.has(ip))
  if (newIps.length > 0) {
    const inserted = await db
      .insert(ipAddresses)
      .values(
        newIps.map((ip) => ({
          ip,
          countryCode: geoip.lookup(ip)?.country || null,
          emailsSentCount: 0,
          firstSeenAt: now,
          lastSeenAt: now,
          locationLastUpdate: now,
          createdAt: now,
          updatedAt: now,
        })),
      )
      .returning({ id: ipAddresses.id, ip: ipAddresses.ip })
    for (const row of inserted) result.set(row.ip, row.id)
  }

  const freshIds: number[] = []
  for (const row of existingRows) {
    result.set(row.ip, row.id)
    const isStale =
      !row.locationLastUpdate ||
      now.getTime() - row.locationLastUpdate.getTime() > THIRTY_DAYS_MS
    if (!isStale) {
      freshIds.push(row.id)
      continue
    }
    await db
      .update(ipAddresses)
      .set({
        countryCode: geoip.lookup(row.ip)?.country || null,
        locationLastUpdate: now,
        lastSeenAt: now,
        updatedAt: now,
      })
      .where(eq(ipAddresses.id, row.id))
  }

  if (freshIds.length > 0) {
    await db
      .update(ipAddresses)
      .set({ lastSeenAt: now, updatedAt: now })
      .where(inArray(ipAddresses.id, freshIds))
  }

  return result
}
