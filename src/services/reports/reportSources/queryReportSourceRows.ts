import {
  getDb,
  ipAddresses,
  ipHostnameEnrichments,
  normalizedEvents,
} from '@/lib/db'
import { eq, sql } from 'drizzle-orm'

/** Sending sources of one report, grouped by IP and authentication outcome. */
export async function queryReportSourceRows(rawReportId: number) {
  return getDb()
    .select({
      ip: ipAddresses.ip,
      countryCode: ipAddresses.countryCode,
      hostname: ipHostnameEnrichments.hostname,
      messageCount:
        sql<number>`cast(sum(${normalizedEvents.count}) as integer)`.as(
          'message_count',
        ),
      spfResult: normalizedEvents.spfResult,
      dkimResult: normalizedEvents.dkimResult,
      spfAligned: normalizedEvents.spfAligned,
      dkimAligned: normalizedEvents.dkimAligned,
      disposition: normalizedEvents.disposition,
    })
    .from(normalizedEvents)
    .innerJoin(ipAddresses, eq(normalizedEvents.ipAddressId, ipAddresses.id))
    .leftJoin(
      ipHostnameEnrichments,
      eq(ipAddresses.ip, ipHostnameEnrichments.ip),
    )
    .where(eq(normalizedEvents.rawReportId, rawReportId))
    .groupBy(
      ipAddresses.id,
      ipHostnameEnrichments.hostname,
      normalizedEvents.spfResult,
      normalizedEvents.dkimResult,
      normalizedEvents.spfAligned,
      normalizedEvents.dkimAligned,
      normalizedEvents.disposition,
    )
    .orderBy(sql`message_count desc`)
}
