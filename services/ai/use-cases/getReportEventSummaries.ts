import { getDb, ipAddresses, normalizedEvents } from '@/lib/db'
import { eq } from 'drizzle-orm'
import type { NormalizedEventSummary } from '../contracts'

/**
 * Fetches normalized event summaries for a given report.
 * Source IPs are included for redaction in the prompt builder.
 */
export function getReportEventSummaries(
  rawReportId: number,
): NormalizedEventSummary[] {
  const db = getDb()
  const rows = db
    .select({
      sourceIp: ipAddresses.ip,
      spfResult: normalizedEvents.spfResult,
      dkimResult: normalizedEvents.dkimResult,
      spfAligned: normalizedEvents.spfAligned,
      dkimAligned: normalizedEvents.dkimAligned,
      disposition: normalizedEvents.disposition,
      count: normalizedEvents.count,
    })
    .from(normalizedEvents)
    .innerJoin(ipAddresses, eq(normalizedEvents.ipAddressId, ipAddresses.id))
    .where(eq(normalizedEvents.rawReportId, rawReportId))
    .all()

  return rows
}
