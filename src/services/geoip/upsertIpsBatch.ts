import { getDb, ipAddresses } from '@/lib/db'
import { normalizeIp } from '@/utils/geoip'
import { inArray } from 'drizzle-orm'
import { getGeoip } from './getGeoip'
import { insertNewIpRows } from './insertNewIpRows'
import { insertPendingLookups } from './insertPendingLookups'
import { isLocationStale } from './isLocationStale'
import { lookupCountryCode } from './lookupCountryCode'
import { touchIpsLastSeen } from './touchIpsLastSeen'
import { updateIpLocation } from './updateIpLocation'

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
  const geoip = await getGeoip()
  const normalized = [...new Set(ips.map(normalizeIp).filter(Boolean))]
  const result = new Map<string, number>()
  if (normalized.length === 0) return result

  await insertPendingLookups(normalized)

  const now = new Date()
  const existingRows = await getDb()
    .select()
    .from(ipAddresses)
    .where(inArray(ipAddresses.ip, normalized))
  const existingIps = new Set(existingRows.map((row) => row.ip))

  const newIps = normalized.filter((ip) => !existingIps.has(ip))
  for (const row of await insertNewIpRows(geoip, newIps, now)) {
    result.set(row.ip, row.id)
  }

  const freshIds: number[] = []
  for (const row of existingRows) {
    result.set(row.ip, row.id)
    if (!isLocationStale(row.locationLastUpdate, now)) {
      freshIds.push(row.id)
      continue
    }
    await updateIpLocation(row.id, lookupCountryCode(geoip, row.ip), now)
  }

  await touchIpsLastSeen(freshIds, now)

  return result
}
