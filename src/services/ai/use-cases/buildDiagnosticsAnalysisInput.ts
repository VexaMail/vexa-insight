import {
  computeDomainScore,
  getDiagnosticStats,
  getDomainDnsRecords,
} from '@/services/diagnostics'
import { settledValue } from '@/utils/async'
import type {
  DiagnosticsAnalysisInput,
  GenerateDiagnosticsInsightsOptions,
} from '../contracts'
import { AIServiceErrorException } from '../core/AiServiceErrorException'
import { buildDiagnosticsDnsSummary } from './buildDiagnosticsDnsSummary'
import { buildDiagnosticsStatsSummary } from './buildDiagnosticsStatsSummary'
import { getDomainDiagnosticsReportAggregate } from './getDomainDiagnosticsReportAggregate'
import { summarizeAdminGuides } from './summarizeAdminGuides'

/**
 * Assembles everything the diagnostics prompt reads, from the three sources it
 * can draw on. Degrades gracefully: report data is optional, but DNS and stats
 * cannot both be missing or there is nothing to analyze.
 *
 * Shared by the runtime orchestrator and the offline prompt harness so both
 * send the model the same picture of a domain.
 */
export async function buildDiagnosticsAnalysisInput(
  options: GenerateDiagnosticsInsightsOptions,
): Promise<DiagnosticsAnalysisInput> {
  const [dnsResult, statsResult, reportAggregateResult] =
    await Promise.allSettled([
      getDomainDnsRecords(options.domainName),
      getDiagnosticStats({
        domainId: options.domainId,
        startDate: options.startDate,
        endDate: options.endDate,
      }),
      getDomainDiagnosticsReportAggregate(
        options.domainId,
        options.startDate,
        options.endDate,
      ),
    ])

  const dnsRecords = settledValue(dnsResult)
  const rawStats = settledValue(statsResult)
  const dns = dnsRecords ? buildDiagnosticsDnsSummary(dnsRecords) : null
  const score = dnsRecords ? computeDomainScore(dnsRecords) : null
  const stats = rawStats ? buildDiagnosticsStatsSummary(rawStats) : null
  const reportAggregate = settledValue(reportAggregateResult)
  const adminGuides =
    dnsRecords && rawStats && score
      ? summarizeAdminGuides(dnsRecords, rawStats, score)
      : []

  if (!dns && !stats) {
    throw new AIServiceErrorException(
      'INSUFFICIENT_DATA',
      'Could not retrieve DNS records or diagnostic statistics for this domain.',
    )
  }

  return {
    domainName: options.domainName,
    score,
    dns,
    stats,
    reportAggregate,
    adminGuides,
  }
}
