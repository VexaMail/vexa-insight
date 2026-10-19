import { domains, getDb, normalizedEvents, rawReports } from '@/lib/db'
import type { ReporterCoverage } from '@/types/gaps'
import { summarizeReporterCoverage } from '@/utils/gaps'
import { eq } from 'drizzle-orm'

/**
 * Every receiver that has reported on a domain, newest first, with whether a
 * regular one went quiet: a domain that loses one receiver's reports while
 * others keep arriving looks healthy from the domain-level check alone.
 */
export async function getReporterCoverage(
  domainName: string,
  nowMs = Date.now(),
): Promise<ReporterCoverage[]> {
  const reports = await getDb()
    .selectDistinct({
      id: rawReports.id,
      orgName: rawReports.orgName,
      endDate: rawReports.endDate,
    })
    .from(rawReports)
    .innerJoin(
      normalizedEvents,
      eq(normalizedEvents.rawReportId, rawReports.id),
    )
    .innerJoin(domains, eq(normalizedEvents.domainId, domains.id))
    .where(eq(domains.name, domainName))
  return summarizeReporterCoverage(reports, Math.floor(nowMs / 1000))
}
