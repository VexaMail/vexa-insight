import { diagnosticsOverviewConcurrency } from '@/constants/diagnostics'
import { getDomainsSummaryAll } from '@/services/reports'
import type { DiagnosticsOverviewRow } from '@/types/diagnostics'
import {
  buildDiagnosticsFindings,
  resolveWithConcurrency,
} from '@/utils/diagnostics'
import { computeDomainScore } from './computeDomainScore'
import { getDnsSnapshot } from './getDnsSnapshot'

/** Score and protocol states of every visible domain, lowest score first. */
export async function loadDiagnosticsOverview(): Promise<
  DiagnosticsOverviewRow[]
> {
  const { domains } = await getDomainsSummaryAll()
  const rows = await resolveWithConcurrency(
    domains,
    diagnosticsOverviewConcurrency,
    async (domain) => {
      const snapshot = await getDnsSnapshot(domain.domainId, domain.domainName)
      return {
        domainName: domain.domainName,
        score: computeDomainScore(snapshot.dns),
        findings: buildDiagnosticsFindings(snapshot),
        checkedAt: snapshot.checkedAt,
        resolved: snapshot.dns.nsRecords.length > 0,
      }
    },
  )
  return rows.toSorted(
    (left, right) =>
      Number(!left.resolved) - Number(!right.resolved) ||
      left.score.percentage - right.score.percentage ||
      left.domainName.localeCompare(right.domainName),
  )
}
