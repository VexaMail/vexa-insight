import { getDb, ipHostnameEnrichments } from '@/lib/db'
import { getConfig } from '@/services/config'
import { hoursFromNow } from './hoursFromNow'
import { privateIpSkippedError } from './privateIpSkippedError'

/** Records a private IP as a negative-cached miss instead of querying DNS. */
export async function persistPrivateIpSkip(
  ip: string,
  now: Date,
): Promise<void> {
  const nextLookupAt = hoursFromNow(
    now,
    getConfig().ipHostnameNegativeCacheHours,
  )

  await getDb()
    .insert(ipHostnameEnrichments)
    .values({
      ip,
      lookupStatus: 'not_found',
      lookupError: privateIpSkippedError,
      nextLookupAt,
    })
    .onConflictDoUpdate({
      target: ipHostnameEnrichments.ip,
      set: {
        lookupStatus: 'not_found',
        lookupError: privateIpSkippedError,
        nextLookupAt,
        updatedAt: now,
      },
    })
}
