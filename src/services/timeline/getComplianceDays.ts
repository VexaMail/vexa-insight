import { domains, getDb, normalizedEvents } from '@/lib/db'
import type { TimelineDay } from '@/types/timeline'
import { and, asc, eq, gte, sql } from 'drizzle-orm'

/** Daily totals and DMARC-aligned messages of a domain since `since`. */
export async function getComplianceDays(
  domainName: string,
  since: number,
): Promise<TimelineDay[]> {
  const day = sql<number>`cast(${normalizedEvents.reportEndDate} / 86400 as integer)`
  return getDb()
    .select({
      day: day.mapWith(Number),
      total: sql<number>`sum(${normalizedEvents.count})`.mapWith(Number),
      aligned:
        sql<number>`sum(case when ${normalizedEvents.spfAligned} = 1 or ${normalizedEvents.dkimAligned} = 1 then ${normalizedEvents.count} else 0 end)`.mapWith(
          Number,
        ),
    })
    .from(normalizedEvents)
    .innerJoin(domains, eq(normalizedEvents.domainId, domains.id))
    .where(
      and(
        eq(domains.name, domainName),
        gte(normalizedEvents.reportEndDate, since),
      ),
    )
    .groupBy(day)
    .orderBy(asc(day))
}
