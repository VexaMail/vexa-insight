import { getDb, normalizedEvents } from '@/lib/db'
import type { SQL } from 'drizzle-orm'
import { sql } from 'drizzle-orm'

/** Message-weighted authentication totals and observed date bounds. */
export async function queryDiagnosticsTotals(whereClause: SQL | undefined) {
  const [row] = await getDb()
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

  return row ?? null
}
