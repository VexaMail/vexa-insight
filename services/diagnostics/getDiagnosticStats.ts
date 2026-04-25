import {
  getDb,
  normalizedEventPolicyOverrides,
  normalizedEvents,
} from '@/lib/db'
import type { DiagnosticStats } from '@/types/diagnostics'
import { toUnixSeconds } from '@/utils/dates'
import { and, eq, sql } from 'drizzle-orm'
import type { GetDiagnosticStatsParams } from './GetDiagnosticStatsParams'

export async function getDiagnosticStats({
  domainId,
  startDate,
  endDate,
}: GetDiagnosticStatsParams): Promise<DiagnosticStats> {
  const db = getDb()

  const conditions = [eq(normalizedEvents.domainId, domainId)]
  if (startDate) {
    conditions.push(
      sql`${normalizedEvents.reportBeginDate} >= ${toUnixSeconds(startDate)}`,
    )
  }
  if (endDate) {
    conditions.push(
      sql`${normalizedEvents.reportEndDate} <= ${toUnixSeconds(endDate)}`,
    )
  }

  const whereClause = and(...conditions)

  const [row] = await db
    .select({
      totalEvents: sql<number>`cast(coalesce(sum(${normalizedEvents.count}), 0) as integer)`,
      failedEvents: sql<number>`
        cast(coalesce(sum(case when ${normalizedEvents.disposition} != 'none' then ${normalizedEvents.count} else 0 end), 0) as integer)
      `,

      spf_pass_unaligned: sql<number>`
        cast(coalesce(sum(case when ${normalizedEvents.spfAuthResult} = 'pass' and ${normalizedEvents.spfAligned} = 0 then ${normalizedEvents.count} else 0 end), 0) as integer)
      `,
      dkim_pass_unaligned: sql<number>`
        cast(coalesce(sum(case when ${normalizedEvents.dkimResult} = 'pass' and ${normalizedEvents.dkimAligned} = 0 then ${normalizedEvents.count} else 0 end), 0) as integer)
      `,

      spf_auth_fail: sql<number>`
        cast(coalesce(sum(case when ${normalizedEvents.spfAuthResult} = 'fail' then ${normalizedEvents.count} else 0 end), 0) as integer)
      `,
      spf_permerror: sql<number>`
        cast(coalesce(sum(case when ${normalizedEvents.spfAuthResult} = 'permerror' then ${normalizedEvents.count} else 0 end), 0) as integer)
      `,
      spf_temperror: sql<number>`
        cast(coalesce(sum(case when ${normalizedEvents.spfAuthResult} = 'temperror' then ${normalizedEvents.count} else 0 end), 0) as integer)
      `,
      spf_softfail: sql<number>`
        cast(coalesce(sum(case when ${normalizedEvents.spfAuthResult} = 'softfail' then ${normalizedEvents.count} else 0 end), 0) as integer)
      `,

      dkim_all_fail: sql<number>`
        cast(coalesce(sum(case when ${normalizedEvents.dkimResult} != 'pass' then ${normalizedEvents.count} else 0 end), 0) as integer)
      `,
    })
    .from(normalizedEvents)
    .where(whereClause)

  // Subquery for policy overrides
  const [overrideRow] = await db
    .select({
      dmarc_override_forwarded: sql<number>`
        cast(coalesce(sum(case when ${normalizedEventPolicyOverrides.type} = 'forwarded' then ${normalizedEvents.count} else 0 end), 0) as integer)
      `,
      dmarc_override_local_policy: sql<number>`
        cast(coalesce(sum(case when ${normalizedEventPolicyOverrides.type} = 'local_policy' then ${normalizedEvents.count} else 0 end), 0) as integer)
      `,
    })
    .from(normalizedEventPolicyOverrides)
    .innerJoin(
      normalizedEvents,
      eq(normalizedEventPolicyOverrides.eventId, normalizedEvents.id),
    )
    .where(whereClause)

  return {
    totalEvents: row?.totalEvents ?? 0,
    failedEvents: row?.failedEvents ?? 0,
    spf_pass_unaligned: row?.spf_pass_unaligned ?? 0,
    dkim_pass_unaligned: row?.dkim_pass_unaligned ?? 0,
    spf_auth_fail: row?.spf_auth_fail ?? 0,
    spf_permerror: row?.spf_permerror ?? 0,
    spf_temperror: row?.spf_temperror ?? 0,
    spf_softfail: row?.spf_softfail ?? 0,
    dkim_all_fail: row?.dkim_all_fail ?? 0,
    dmarc_override_forwarded: overrideRow?.dmarc_override_forwarded ?? 0,
    dmarc_override_local_policy: overrideRow?.dmarc_override_local_policy ?? 0,
  }
}
