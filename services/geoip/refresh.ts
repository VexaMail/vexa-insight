import { getDb, ipAddresses } from '@/lib/db'
import { eq, isNull, lt, or } from 'drizzle-orm'
import { geoip } from './geoip'
import { THIRTY_DAYS_MS } from './thirtyDaysMs'

export async function refreshIpAddresses(batchSize: number = 500) {
  const db = getDb()
  const thirtyDaysAgo = new Date(Date.now() - THIRTY_DAYS_MS)

  // Select IPs that are missing country code, locationLastUpdate, or are older than 30 days
  const staleIps = await db
    .select()
    .from(ipAddresses)
    .where(
      or(
        isNull(ipAddresses.countryCode),
        isNull(ipAddresses.locationLastUpdate),
        lt(ipAddresses.locationLastUpdate, thirtyDaysAgo),
      ),
    )
    .limit(batchSize)

  let updated = 0
  const skipped = 0
  let errors = 0

  for (const ipRecord of staleIps) {
    try {
      const now = new Date()
      // Only do a lookup if it is fresh in the data or missing
      const lookupResult = geoip.lookup(ipRecord.ip)
      const countryCode = lookupResult?.country || null

      await db
        .update(ipAddresses)
        .set({
          countryCode,
          locationLastUpdate: now,
          updatedAt: now,
        })
        .where(eq(ipAddresses.id, ipRecord.id))

      updated++
    } catch (e) {
      errors++
      console.error(`Error refreshing IP ${ipRecord.ip}:`, e)
    }
  }

  return { processed: staleIps.length, updated, skipped, errors }
}
