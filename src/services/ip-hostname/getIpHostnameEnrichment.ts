import { getDb, ipHostnameEnrichments } from '@/lib/db'
import type { IpHostnameEnrichmentDetail } from '@/types/ips'
import { eq } from 'drizzle-orm'

/**
 * Fetches the stored hostname enrichment detail for an IP, or null when
 * the IP has no enrichment row yet.
 */
export async function getIpHostnameEnrichment(
  ip: string,
): Promise<IpHostnameEnrichmentDetail | null> {
  const db = getDb()
  const [record] = await db
    .select({
      ip: ipHostnameEnrichments.ip,
      hostname: ipHostnameEnrichments.hostname,
      lookupStatus: ipHostnameEnrichments.lookupStatus,
      lastLookupAt: ipHostnameEnrichments.lastLookupAt,
      nextLookupAt: ipHostnameEnrichments.nextLookupAt,
      error: ipHostnameEnrichments.lookupError,
    })
    .from(ipHostnameEnrichments)
    .where(eq(ipHostnameEnrichments.ip, ip))
    .limit(1)

  return record ?? null
}
