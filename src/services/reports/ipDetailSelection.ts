import { ipAddresses, ipHostnameEnrichments, normalizedEvents } from '@/lib/db'
import { sql } from 'drizzle-orm'
import { dkimAuthPassSql } from './dkimAuthPassSql'
import { dkimUnalignedPassSql } from './dkimUnalignedPassSql'

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
  // Raw SPF authentication (auth_results), independent of alignment.
  spfAuthPassCount:
    sql<number>`coalesce(sum(case when ${normalizedEvents.spfAuthResult} = 'pass' then ${normalizedEvents.count} else 0 end), 0)`.as(
      'spf_auth_pass_count',
    ),
  spfUnalignedPassCount:
    sql<number>`coalesce(sum(case when ${normalizedEvents.spfAuthResult} = 'pass' and ${normalizedEvents.spfAligned} = 0 then ${normalizedEvents.count} else 0 end), 0)`.as(
      'spf_unaligned_pass_count',
    ),
  dkimAuthPassCount:
    sql<number>`coalesce(sum(case when ${dkimAuthPassSql} then ${normalizedEvents.count} else 0 end), 0)`.as(
      'dkim_auth_pass_count',
    ),
  dkimUnalignedPassCount:
    sql<number>`coalesce(sum(case when ${normalizedEvents.dkimAligned} = 0 and ${dkimUnalignedPassSql} then ${normalizedEvents.count} else 0 end), 0)`.as(
      'dkim_unaligned_pass_count',
    ),
  // DMARC passes when either identifier passes aligned (RFC 7489 section 4.2).
  dmarcPassCount:
    sql<number>`coalesce(sum(case when ${normalizedEvents.spfAligned} = 1 or ${normalizedEvents.dkimAligned} = 1 then ${normalizedEvents.count} else 0 end), 0)`.as(
      'dmarc_pass_count',
    ),
  fullyAlignedCount:
    sql<number>`sum(case when ${normalizedEvents.spfAligned} = 1 and ${normalizedEvents.dkimAligned} = 1 then ${normalizedEvents.count} else 0 end)`.as(
      'fully_aligned_count',
    ),
  // RFC 9990 adds `pass`: the message passed, so no policy was applied.
  dispositionNone:
    sql<number>`sum(case when ${normalizedEvents.disposition} in ('none', 'pass') then ${normalizedEvents.count} else 0 end)`.as(
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
