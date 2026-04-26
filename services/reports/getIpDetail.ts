import {
  getDb,
  ipAddresses,
  ipHostnameEnrichments,
  normalizedEvents,
} from '@/lib/db'
import type { IpDateRange } from '@/types/filters'
import type { IpSummaryData } from '@/types/ips'
import { computeRate } from '@/utils/ips'
import { and, eq, gte, lte, sql } from 'drizzle-orm'

export async function getIpDetail(
  ip: string,
  dateRange?: IpDateRange,
): Promise<IpSummaryData | null> {
  const db = getDb()

  const rows = await db
    .select({
      ip: ipAddresses.ip,
      countryCode: ipAddresses.countryCode,
      hostname: ipHostnameEnrichments.hostname,
      hostnameLastLookupAt: ipHostnameEnrichments.lastLookupAt,
      emailsSentCount: ipAddresses.emailsSentCount,
      totalMessages: sql<number>`sum(${normalizedEvents.count})`.as(
        'total_messages',
      ),
      firstSeen: sql<number>`min(${normalizedEvents.reportBeginDate})`.as(
        'first_seen',
      ),
      lastSeen: sql<number>`max(${normalizedEvents.reportEndDate})`.as(
        'last_seen',
      ),
      spfPassCount:
        sql<number>`sum(case when ${normalizedEvents.spfAligned} = 1 then ${normalizedEvents.count} else 0 end)`.as(
          'spf_pass_count',
        ),
      dkimPassCount:
        sql<number>`sum(case when ${normalizedEvents.dkimAligned} = 1 then ${normalizedEvents.count} else 0 end)`.as(
          'dkim_pass_count',
        ),
      fullyAlignedCount:
        sql<number>`sum(case when ${normalizedEvents.spfAligned} = 1 and ${normalizedEvents.dkimAligned} = 1 then ${normalizedEvents.count} else 0 end)`.as(
          'fully_aligned_count',
        ),
      dispositionNone:
        sql<number>`sum(case when ${normalizedEvents.disposition} = 'none' then ${normalizedEvents.count} else 0 end)`.as(
          'disposition_none',
        ),
      dispositionQuarantine:
        sql<number>`sum(case when ${normalizedEvents.disposition} = 'quarantine' then ${normalizedEvents.count} else 0 end)`.as(
          'disposition_quarantine',
        ),
      dispositionReject:
        sql<number>`sum(case when ${normalizedEvents.disposition} = 'reject' then ${normalizedEvents.count} else 0 end)`.as(
          'disposition_reject',
        ),
    })
    .from(ipAddresses)
    .leftJoin(
      normalizedEvents,
      and(
        eq(normalizedEvents.ipAddressId, ipAddresses.id),
        dateRange?.fromTs
          ? gte(normalizedEvents.reportEndDate, dateRange.fromTs)
          : undefined,
        dateRange?.toTs
          ? lte(normalizedEvents.reportEndDate, dateRange.toTs)
          : undefined,
      ),
    )
    .leftJoin(
      ipHostnameEnrichments,
      eq(ipHostnameEnrichments.ip, ipAddresses.ip),
    )
    .where(eq(ipAddresses.ip, ip))
    .groupBy(
      ipAddresses.id,
      ipHostnameEnrichments.hostname,
      ipHostnameEnrichments.lastLookupAt,
    )
    .limit(1)

  const r = rows[0]
  if (!r) return null

  const totalMessages = Number(r.totalMessages)
  const spfPassCount = Number(r.spfPassCount)
  const dkimPassCount = Number(r.dkimPassCount)
  const fullyAlignedCount = Number(r.fullyAlignedCount)

  return {
    ip: r.ip,
    countryCode: r.countryCode,
    hostname: r.hostname,
    hostnameLastLookupAt: r.hostnameLastLookupAt
      ? Math.floor(r.hostnameLastLookupAt.getTime() / 1000)
      : null,
    totalMessages,
    emailsSentCount: r.emailsSentCount,
    firstSeen: r.firstSeen ? Number(r.firstSeen) : null,
    lastSeen: r.lastSeen ? Number(r.lastSeen) : null,
    spfPassCount,
    dkimPassCount,
    fullyAlignedCount,
    spfPassRate: computeRate(spfPassCount, totalMessages),
    dkimPassRate: computeRate(dkimPassCount, totalMessages),
    fullyAlignedRate: computeRate(fullyAlignedCount, totalMessages),
    dispositionNone: Number(r.dispositionNone),
    dispositionQuarantine: Number(r.dispositionQuarantine),
    dispositionReject: Number(r.dispositionReject),
  }
}
