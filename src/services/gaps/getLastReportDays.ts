import { domains, eventRollupDaily, getDb } from '@/lib/db'
import { eq, max } from 'drizzle-orm'

/** The last day with report data for each domain, by domain id. */
export async function getLastReportDays(): Promise<
  { domainId: number; domainName: string; lastReportDay: number | null }[]
> {
  return getDb()
    .select({
      domainId: domains.id,
      domainName: domains.name,
      lastReportDay: max(eventRollupDaily.day),
    })
    .from(domains)
    .leftJoin(eventRollupDaily, eq(eventRollupDaily.domainId, domains.id))
    .groupBy(domains.id, domains.name)
}
