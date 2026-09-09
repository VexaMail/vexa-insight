import { getDomainsSummaryAll } from '@/services/reports'
import type {
  DiagnosticsQueryWindow,
  DomainDiagnosticsData,
} from '@/types/diagnostics'
import { buildDiagnosticsAdminGuides } from './buildDiagnosticsAdminGuides'
import { computeDomainScore } from './computeDomainScore'
import { getDiagnosticStats } from './getDiagnosticStats'
import { getDomainDnsRecords } from './getDomainDnsRecords'

/** Loads, in parallel, everything the diagnostics page shows for a domain. */
export async function loadDomainDiagnostics(
  domainId: number,
  domainName: string,
  { queryFromDate, queryToDate }: DiagnosticsQueryWindow,
): Promise<DomainDiagnosticsData> {
  const [summaryResponse, stats, dns] = await Promise.all([
    getDomainsSummaryAll(queryFromDate, queryToDate),
    getDiagnosticStats({
      domainId,
      startDate: queryFromDate,
      endDate: queryToDate,
    }),
    getDomainDnsRecords(domainName),
  ])
  const score = computeDomainScore(dns)
  return {
    domains: summaryResponse.domains.map((d) => ({
      id: d.domainId,
      name: d.domainName,
    })),
    stats,
    dns,
    score,
    guides: buildDiagnosticsAdminGuides(dns, stats, score),
  }
}
