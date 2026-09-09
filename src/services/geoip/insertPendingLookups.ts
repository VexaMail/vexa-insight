import { getDb, ipHostnameEnrichments } from '@/lib/db'

/** Queues every address for background hostname enrichment, once each. */
export async function insertPendingLookups(ips: string[]): Promise<void> {
  await getDb()
    .insert(ipHostnameEnrichments)
    .values(ips.map((ip) => ({ ip, lookupStatus: 'pending' as const })))
    .onConflictDoNothing({ target: ipHostnameEnrichments.ip })
}
