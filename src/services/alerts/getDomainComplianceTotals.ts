import { domains, getDb, normalizedEvents } from '@/lib/db'
import type { DomainComplianceTotals } from '@/types/alerts'
import { and, eq, gte, lt, sql } from 'drizzle-orm'

/**
 * Messages and DMARC-aligned messages per domain for reports ending in
 * `[since, until)` (Unix seconds).
 */
export async function getDomainComplianceTotals(
  since: number,
  until: number,
): Promise<Map<string, DomainComplianceTotals>> {
  const rows = await getDb()
    .select({
      domain: domains.name,
      total: sql<number>`coalesce(sum(${normalizedEvents.count}), 0)`.mapWith(
        Number,
      ),
      aligned:
        sql<number>`coalesce(sum(case when ${normalizedEvents.spfAligned} = 1 or ${normalizedEvents.dkimAligned} = 1 then ${normalizedEvents.count} else 0 end), 0)`.mapWith(
          Number,
        ),
    })
    .from(normalizedEvents)
    .innerJoin(domains, eq(normalizedEvents.domainId, domains.id))
    .where(
      and(
        gte(normalizedEvents.reportEndDate, since),
        lt(normalizedEvents.reportEndDate, until),
      ),
    )
    .groupBy(domains.name)
  return new Map(
    rows.map((row) => [row.domain, { total: row.total, aligned: row.aligned }]),
  )
}
