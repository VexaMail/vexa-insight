import { dnsSnapshots, getDb } from '@/lib/db'
import type { DnsHistoryEntry } from '@/types/dns-history'
import { desc, eq } from 'drizzle-orm'

/** Every stored change of a domain's tracked records, newest first. */
export async function listDnsHistory(
  domainName: string,
  limit = 200,
): Promise<DnsHistoryEntry[]> {
  return getDb()
    .select({
      id: dnsSnapshots.id,
      recordKind: dnsSnapshots.recordKind,
      value: dnsSnapshots.value,
      observedAt: dnsSnapshots.observedAt,
      source: dnsSnapshots.source,
    })
    .from(dnsSnapshots)
    .where(eq(dnsSnapshots.domainName, domainName))
    .orderBy(desc(dnsSnapshots.observedAt), desc(dnsSnapshots.id))
    .limit(limit)
}
