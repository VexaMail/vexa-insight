import { getDb, ipHostnameEnrichments } from '@/lib/db'
import type { PersistLookupOutcomeInput } from './PersistLookupOutcomeInput'

/** Upserts the enrichment row for one completed reverse-DNS lookup. */
export async function persistLookupOutcome({
  ip,
  now,
  lookup,
  schedule,
}: PersistLookupOutcomeInput): Promise<void> {
  const row = {
    hostname: lookup.hostname,
    lookupStatus: lookup.status,
    lastLookupAt: now,
    nextLookupAt: schedule.nextLookupAt,
    lastSuccessAt: schedule.lastSuccessAt,
    lookupError: lookup.error,
    retryCount: schedule.retryCount,
    updatedAt: now,
  }

  await getDb()
    .insert(ipHostnameEnrichments)
    .values({ ip, ...row })
    .onConflictDoUpdate({ target: ipHostnameEnrichments.ip, set: row })
}
