import { ipAddresses, ipHostnameEnrichments, normalizedEvents } from '@/lib/db'
import { sql } from 'drizzle-orm'

/** Projection of the aggregated IP detail query. */
export const ipDetailSelection = {
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
  lastSeen: sql<number>`max(${normalizedEvents.reportEndDate})`.as('last_seen'),
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
}
