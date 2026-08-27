import { getDb, ipAddresses } from '@/lib/db'
import { eq } from 'drizzle-orm'
import { IpHostnameEnrichmentService } from '../ip-hostname/IpHostnameEnrichmentService'
import { geoip } from './geoip'
import { THIRTY_DAYS_MS } from './thirtyDaysMs'

export async function upsertIp(ipStr: string): Promise<number> {
  const db = getDb()
  // Basic validation/normalization of IP (e.g. trim whitespace, handle basic IPv6 wrappers)
  const normalizedIp = ipStr.trim().replace(/^\[|\]$/g, '')
  if (!normalizedIp) throw new Error('Invalid IP address')

  // Enqueue for background hostname lookup
  try {
    await IpHostnameEnrichmentService.scheduleLookup(normalizedIp)
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
    const lookupResult = geoip.lookup(normalizedIp)
    const countryCode = lookupResult?.country || null

    const inserted = await db
      .insert(ipAddresses)
      .values({
        ip: normalizedIp,
        countryCode,
        emailsSentCount: 0,
        firstSeenAt: now,
        lastSeenAt: now,
        locationLastUpdate: now,
        createdAt: now,
        updatedAt: now,
      })
      .returning({ id: ipAddresses.id })
    if (!inserted[0]) throw new Error('Failed to insert IP')
    return inserted[0].id
  }

  // Exists: check if stale
  const isStale =
    !existing.locationLastUpdate ||
    now.getTime() - existing.locationLastUpdate.getTime() > THIRTY_DAYS_MS

  if (isStale) {
    const lookupResult = geoip.lookup(normalizedIp)
    const countryCode = lookupResult?.country || null

    await db
      .update(ipAddresses)
      .set({
        countryCode,
        locationLastUpdate: now,
        lastSeenAt: now,
        updatedAt: now,
      })
      .where(eq(ipAddresses.id, existing.id))

    return existing.id
  }

  // Exists and fresh enough, just update last seen
  await db
    .update(ipAddresses)
    .set({
      lastSeenAt: now,
      updatedAt: now,
    })
    .where(eq(ipAddresses.id, existing.id))

  return existing.id
}
