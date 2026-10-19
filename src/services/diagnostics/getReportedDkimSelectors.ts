import { reportedSelectorLimit } from '@/constants/diagnostics'
import { getDb, normalizedEventDkimResults, normalizedEvents } from '@/lib/db'
import { and, desc, eq, sql } from 'drizzle-orm'

/**
 * Selectors that signed this domain's own mail (d= the domain) in received
 * reports, most used first. They are probed next to the fixed list, so a
 * provider with per-account selectors is not reported as having no DKIM.
 */
export async function getReportedDkimSelectors(
  domainId: number,
  domainName: string,
): Promise<string[]> {
  const volume = sql`sum(${normalizedEvents.count})`
  const rows = await getDb()
    .select({ selector: normalizedEventDkimResults.selector })
    .from(normalizedEventDkimResults)
    .innerJoin(
      normalizedEvents,
      eq(normalizedEventDkimResults.eventId, normalizedEvents.id),
    )
    .where(
      and(
        eq(normalizedEvents.domainId, domainId),
        sql`lower(${normalizedEventDkimResults.domain}) = ${domainName.toLowerCase()}`,
      ),
    )
    .groupBy(normalizedEventDkimResults.selector)
    .orderBy(desc(volume))
    .limit(reportedSelectorLimit)
  return rows
    .map((row) => row.selector.trim().toLowerCase())
    .filter((selector) => /^[a-z0-9][a-z0-9._-]{0,62}$/.test(selector))
}
