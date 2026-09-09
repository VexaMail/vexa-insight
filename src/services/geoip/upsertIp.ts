import { getDb, ipAddresses } from '@/lib/db'
import { eq } from 'drizzle-orm'
import { scheduleLookup } from '../ip-hostname/scheduleLookup'
import { getGeoip } from './getGeoip'
import { isLocationStale } from './isLocationStale'
import { lookupCountryCode } from './lookupCountryCode'
import { newIpRow } from './newIpRow'
import { touchIpsLastSeen } from './touchIpsLastSeen'
import { updateIpLocation } from './updateIpLocation'

export async function upsertIp(ipStr: string): Promise<number> {
  const db = getDb()
  const geoip = await getGeoip()
  // Basic validation/normalization of IP (e.g. trim whitespace, handle basic IPv6 wrappers)
  const normalizedIp = ipStr.trim().replace(/^\[|\]$/g, '')
  if (!normalizedIp) throw new Error('Invalid IP address')

  // Enqueue for background hostname lookup
  try {
    await scheduleLookup(normalizedIp)
  } catch (error) {
    console.error(
      `[upsertIp] Error scheduling hostname lookup for ${normalizedIp}:`,
      error,
    )
  }

  const existingResult = await db
    .select()
    .from(ipAddresses)
    .where(eq(ipAddresses.ip, normalizedIp))
    .limit(1)
  const existing = existingResult[0]

  const now = new Date()

  if (!existing) {
    // Missing: create and lookup
    const inserted = await db
      .insert(ipAddresses)
      .values(
        newIpRow(normalizedIp, lookupCountryCode(geoip, normalizedIp), now),
      )
      .returning({ id: ipAddresses.id })
    if (!inserted[0]) throw new Error('Failed to insert IP')
    return inserted[0].id
  }

  if (isLocationStale(existing.locationLastUpdate, now)) {
    await updateIpLocation(
      existing.id,
      lookupCountryCode(geoip, normalizedIp),
      now,
    )
  } else {
    // Exists and fresh enough, just update last seen
    await touchIpsLastSeen([existing.id], now)
  }

  return existing.id
}
