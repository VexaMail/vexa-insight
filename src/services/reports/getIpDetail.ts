import {
  getDb,
  ipAddresses,
  ipHostnameEnrichments,
  normalizedEvents,
} from '@/lib/db'
import { getAllowedDomainIds } from '@/services/auth'
import type { IpDateRange } from '@/types/filters'
import type { IpSummaryData } from '@/types/ips'
import { computeRate } from '@/utils/ips'
import { and, eq, gte, inArray, lte, sql } from 'drizzle-orm'

export async function getIpDetail(
  ip: string,
  dateRange?: IpDateRange,
): Promise<IpSummaryData | null> {
  const db = getDb()
  const allowedIds = await getAllowedDomainIds()
  if (allowedIds !== null && allowedIds.length === 0) return null

  const rows = await db
    .select({
      ip: ipAddresses.ip,
      countryCode: ipAddresses.countryCode,
      hostname: ipHostnameEnrichments.hostname,
      hostnameLastLookupAt: ipHostnameEnrichments.lastLookupAt,
      emailsSentCount: ipAddresses.emailsSentCount,
      // LEFT JOIN: sum() is NULL, not 0, when the IP has no matching events.
      totalMessages: sql<number | null>`sum(${normalizedEvents.count})`.as(
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
        allowedIds !== null
          ? inArray(normalizedEvents.domainId, allowedIds)
          : undefined,
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

  // The domain filter lives in the LEFT JOIN, so a restricted caller still gets
  // the ipAddresses row back with null aggregates when the IP never sent to one
  // of their domains. Treat that as not-found rather than rendering a zeroed
  // page for an IP they are not entitled to see. Unrestricted callers keep the
  // old behaviour (a zeroed row when the date range is simply empty).
  if (allowedIds !== null && r.totalMessages === null) return null

  const totalMessages = Number(r.totalMessages)
  const spfPassCount = r.spfPassCount
  const dkimPassCount = r.dkimPassCount
  const fullyAlignedCount = r.fullyAlignedCount

  return {
    ip: r.ip,
    countryCode: r.countryCode,
    hostname: r.hostname,
    hostnameLastLookupAt: r.hostnameLastLookupAt
      ? Math.floor(r.hostnameLastLookupAt.getTime() / 1000)
      : null,
    totalMessages,
    emailsSentCount: r.emailsSentCount,
    firstSeen: r.firstSeen ? r.firstSeen : null,
    lastSeen: r.lastSeen ? r.lastSeen : null,
    spfPassCount,
    dkimPassCount,
    fullyAlignedCount,
    spfPassRate: computeRate(spfPassCount, totalMessages),
    dkimPassRate: computeRate(dkimPassCount, totalMessages),
    fullyAlignedRate: computeRate(fullyAlignedCount, totalMessages),
    dispositionNone: r.dispositionNone,
    dispositionQuarantine: r.dispositionQuarantine,
    dispositionReject: r.dispositionReject,
  }
}
