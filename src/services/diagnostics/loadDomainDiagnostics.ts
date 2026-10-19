import { getDomainsSummaryAll } from '@/services/reports'
import type {
  DiagnosticsQueryWindow,
  DomainDiagnosticsData,
} from '@/types/diagnostics'
import { buildDiagnosticsFindings } from '@/utils/diagnostics'
import { buildDiagnosticsAdminGuides } from './buildDiagnosticsAdminGuides'
import { buildDiagnosticsOverviewCheck } from './buildDiagnosticsOverviewCheck'
import { computeDomainScore } from './computeDomainScore'
import { getDiagnosticStats } from './getDiagnosticStats'
import { getDomainDnsRecords } from './getDomainDnsRecords'
import { getReportedDkimSelectors } from './getReportedDkimSelectors'
import { storeDiagnosticsOverviewCheck } from './storeDiagnosticsOverviewCheck'

/**
 * Loads, in parallel, everything the diagnostics page shows for a domain, and
 * keeps the live run for the diagnostics index.
 */
export async function loadDomainDiagnostics(
  domainId: number,
  domainName: string,
  { queryFromDate, queryToDate }: DiagnosticsQueryWindow,
): Promise<DomainDiagnosticsData> {
  const checkedAt = new Date().toISOString()
  const selectors = await getReportedDkimSelectors(domainId, domainName)
  const [summaryResponse, stats, dns] = await Promise.all([
    getDomainsSummaryAll(queryFromDate, queryToDate),
    getDiagnosticStats({
      domainId,
      startDate: queryFromDate,
      endDate: queryToDate,
    }),
    getDomainDnsRecords(domainName, selectors),
  ])
  const score = computeDomainScore(dns)
  await storeDiagnosticsOverviewCheck(
    domainId,
    buildDiagnosticsOverviewCheck({ dns, checkedAt }),
  )
  return {
    domains: summaryResponse.domains.map((d) => ({
      id: d.domainId,
      name: d.domainName,
    })),
    stats,
    dns,
    score,
    guides: buildDiagnosticsAdminGuides(dns, stats, score),
    findings: buildDiagnosticsFindings({ dns, checkedAt }),
    checkedAt,
  }
}
