import { domains, getDb, normalizedEvents } from '@/lib/db'
import { eq } from 'drizzle-orm'
import type { ReportAnalysisInput } from '../contracts'

/**
 * The domains a report carries events for.
 *
 * Deliberately not `attachRelatedDomains` from `services/reports`: importing it
 * pulls the reports barrel, whose ingest path uses a top-level await that tsx
 * cannot transform in a standalone script. Same query, one report at a time.
 */
export async function loadEvalReportDomains(
  reportId: number,
): Promise<ReportAnalysisInput['relatedDomains']> {
  const db = getDb()
  const rows = await db
    .selectDistinct({
      domainId: domains.id,
      domainName: domains.name,
    })
    .from(normalizedEvents)
    .innerJoin(domains, eq(normalizedEvents.domainId, domains.id))
    .where(eq(normalizedEvents.rawReportId, reportId))

  return rows
}
