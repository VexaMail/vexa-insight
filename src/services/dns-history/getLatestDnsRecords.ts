import { dnsSnapshots, getDb } from '@/lib/db'
import type { TrackedDnsRecords } from '@/types/dns-history'
import { desc, eq } from 'drizzle-orm'

/** The last stored value of every record kind seen for a domain. */
export async function getLatestDnsRecords(
  domainName: string,
): Promise<TrackedDnsRecords> {
  const rows = await getDb()
    .select({ recordKind: dnsSnapshots.recordKind, value: dnsSnapshots.value })
    .from(dnsSnapshots)
    .where(eq(dnsSnapshots.domainName, domainName))
    .orderBy(desc(dnsSnapshots.observedAt), desc(dnsSnapshots.id))
  const latest: TrackedDnsRecords = {}
  for (const row of rows) {
    if (!Object.hasOwn(latest, row.recordKind)) {
      latest[row.recordKind] = row.value
    }
  }
  return latest
}
