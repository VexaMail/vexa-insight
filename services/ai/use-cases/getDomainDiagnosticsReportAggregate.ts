import {
  getDb,
  normalizedEventPolicyOverrides,
  normalizedEvents,
  rawReports,
} from '@/lib/db'
import { toUnixSeconds } from '@/utils/dates'
import { and, eq, sql } from 'drizzle-orm'
import type { DiagnosticsReportAggregate } from '../contracts/DiagnosticsReportAggregate'
import { MAX_TOP_ORGS } from './maxTopOrgs'

/**
 * Aggregates all DMARC report data for a domain within an optional date range.
 * Uses SUM(count) weighting for correct message-level statistics.
 */
export async function getDomainDiagnosticsReportAggregate(
  domainId: number,
  startDate?: Date,
  endDate?: Date,
): Promise<DiagnosticsReportAggregate | null> {
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
      totalMessages: sql<number>`cast(coalesce(sum(${normalizedEvents.count}), 0) as integer)`,
      spfPassCount: sql<number>`cast(coalesce(sum(case when ${normalizedEvents.spfResult} = 'pass' then ${normalizedEvents.count} else 0 end), 0) as integer)`,
      dkimPassCount: sql<number>`cast(coalesce(sum(case when ${normalizedEvents.dkimResult} = 'pass' then ${normalizedEvents.count} else 0 end), 0) as integer)`,
      spfAlignedCount: sql<number>`cast(coalesce(sum(case when ${normalizedEvents.spfAligned} = 1 then ${normalizedEvents.count} else 0 end), 0) as integer)`,
      dkimAlignedCount: sql<number>`cast(coalesce(sum(case when ${normalizedEvents.dkimAligned} = 1 then ${normalizedEvents.count} else 0 end), 0) as integer)`,
      reportCount: sql<number>`cast(count(distinct ${normalizedEvents.rawReportId}) as integer)`,
      minDate: sql<number | null>`min(${normalizedEvents.reportBeginDate})`,
      maxDate: sql<number | null>`max(${normalizedEvents.reportEndDate})`,
    })
    .from(normalizedEvents)
    .where(whereClause)

  if (!row || row.totalMessages === 0) {
    return null
  }

  // Disposition breakdown
  const dispositionRows = await db
    .select({
      disposition: normalizedEvents.disposition,
      count: sql<number>`cast(sum(${normalizedEvents.count}) as integer)`,
    })
    .from(normalizedEvents)
    .where(whereClause)
    .groupBy(normalizedEvents.disposition)

  const dispositionBreakdown: Record<string, number> = {}
  for (const d of dispositionRows) {
    dispositionBreakdown[d.disposition] = d.count
  }

  // Top orgs by message count
  const orgRows = await db
    .select({
      orgName: rawReports.orgName,
      messageCount: sql<number>`cast(sum(${normalizedEvents.count}) as integer)`,
    })
    .from(normalizedEvents)
    .innerJoin(rawReports, eq(normalizedEvents.rawReportId, rawReports.id))
    .where(whereClause)
    .groupBy(rawReports.orgName)
    .orderBy(sql`sum(${normalizedEvents.count}) desc`)
    .limit(MAX_TOP_ORGS)

  // Forwarded overrides
  const [overrideRow] = await db
    .select({
      forwardedCount: sql<number>`cast(coalesce(sum(case when ${normalizedEventPolicyOverrides.type} = 'forwarded' then ${normalizedEvents.count} else 0 end), 0) as integer)`,
    })
    .from(normalizedEventPolicyOverrides)
    .innerJoin(
      normalizedEvents,
      eq(normalizedEventPolicyOverrides.eventId, normalizedEvents.id),
    )
    .where(whereClause)

  // Distinct org count
  const [orgCountRow] = await db
    .select({
      orgCount: sql<number>`cast(count(distinct ${rawReports.orgName}) as integer)`,
    })
    .from(normalizedEvents)
    .innerJoin(rawReports, eq(normalizedEvents.rawReportId, rawReports.id))
    .where(whereClause)

  return {
    reportCount: row.reportCount,
    orgCount: orgCountRow?.orgCount ?? 0,
    totalMessages: row.totalMessages,
    spfPassCount: row.spfPassCount,
    dkimPassCount: row.dkimPassCount,
    spfAlignedCount: row.spfAlignedCount,
    dkimAlignedCount: row.dkimAlignedCount,
    dispositionBreakdown,
    topOrgs: orgRows.map((o) => ({
      orgName: o.orgName,
      messageCount: o.messageCount,
    })),
    forwardedOverrideCount: overrideRow?.forwardedCount ?? 0,
    dateRange: {
      start: row.minDate
        ? new Date(row.minDate * 1000).toISOString().slice(0, 10)
        : null,
      end: row.maxDate
        ? new Date(row.maxDate * 1000).toISOString().slice(0, 10)
        : null,
    },
  }
}
