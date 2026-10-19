import type { PublishedDmarcPolicy } from '@/types/domains'
import { parsePolicyPublished } from '@/utils/domains'
import { getLatestDomainReports } from './getLatestDomainReports'

/**
 * The DMARC policy each domain published, read from the latest aggregate
 * report about it. The policy in DNS may have changed since; the DNS tab and
 * the diagnostics page read the live record.
 */
export async function getPublishedPolicies(
  domainIds: readonly number[],
): Promise<Map<number, PublishedDmarcPolicy>> {
  const reports = await getLatestDomainReports(domainIds)
  return new Map(
    reports.map((report) => [
      report.domainId,
      {
        ...parsePolicyPublished(report.snippet),
        reportedAt: report.endDate,
        reporter: report.orgName,
      },
    ]),
  )
}
