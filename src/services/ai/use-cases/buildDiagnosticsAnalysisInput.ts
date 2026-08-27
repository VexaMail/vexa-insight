import {
  buildDiagnosticsAdminGuides,
  computeDomainScore,
  getDiagnosticStats,
  getDomainDnsRecords,
} from '@/services/diagnostics'
import type {
  DiagnosticsAnalysisInput,
  GenerateDiagnosticsInsightsOptions,
} from '../contracts'
import { AIServiceErrorException } from '../core/AiServiceErrorException'
import { buildDiagnosticsDnsSummary } from './buildDiagnosticsDnsSummary'
import { buildDiagnosticsStatsSummary } from './buildDiagnosticsStatsSummary'
import { getDomainDiagnosticsReportAggregate } from './getDomainDiagnosticsReportAggregate'

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

  const dns =
    dnsResult.status === 'fulfilled'
      ? buildDiagnosticsDnsSummary(dnsResult.value)
      : null
  const score =
    dnsResult.status === 'fulfilled'
      ? computeDomainScore(dnsResult.value)
      : null
  const stats =
    statsResult.status === 'fulfilled'
      ? buildDiagnosticsStatsSummary(statsResult.value)
      : null
  const reportAggregate =
    reportAggregateResult.status === 'fulfilled'
      ? reportAggregateResult.value
      : null

  const adminGuides =
    dnsResult.status === 'fulfilled' &&
    statsResult.status === 'fulfilled' &&
    score
      ? buildDiagnosticsAdminGuides(
          dnsResult.value,
          statsResult.value,
          score,
        ).map((guide) => ({
          severity: guide.severity,
          title: guide.title,
          summary: guide.summary,
          howToFix: guide.howToFix,
          verifySteps: guide.verifySteps,
        }))
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
