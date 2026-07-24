import {
  buildDiagnosticsAdminGuides,
  computeDomainScore,
  getDiagnosticStats,
  getDomainDnsRecords,
} from '@/services/diagnostics'
import type { DiagnosticsAnalysisResult } from '@/types/ai'
import type {
  AIServiceError,
  DiagnosticsAnalysisInput,
  GenerateDiagnosticsInsightsOptions,
} from '../contracts'
import { AI_REQUEST_TIMEOUT_MS } from '../core/aiRequestTimeoutMs'
import { resolveProvider } from '../core/resolveProvider'
import { buildDiagnosticsAnalysisPrompt } from '../prompts/buildDiagnosticsAnalysisPrompt'
import { buildDiagnosticsDnsSummary } from './buildDiagnosticsDnsSummary'
import { buildDiagnosticsStatsSummary } from './buildDiagnosticsStatsSummary'
import { getDomainDiagnosticsReportAggregate } from './getDomainDiagnosticsReportAggregate'
import { parseDiagnosticsInsightsFromContent } from './parseDiagnosticsInsightsFromContent'
import { parseDiagnosticsRolloutPlanFromContent } from './parseDiagnosticsRolloutPlanFromContent'
import { wrapProviderError } from './wrapProviderError'

/**
 * Main orchestrator for diagnostics AI insights.
 * Fetches DNS, stats, and report data → normalizes → prompts → parses.
 * Degrades gracefully: report data is optional, DNS+stats are required.
 */
export async function generateDiagnosticsInsights(
  options: GenerateDiagnosticsInsightsOptions,
): Promise<DiagnosticsAnalysisResult> {
  const startMs = Date.now()

  // Fetch all three sources in parallel
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

  // DNS and stats are required; report data is optional
  if (!dns && !stats) {
    const error: AIServiceError = {
      code: 'INSUFFICIENT_DATA',
      message:
        'Could not retrieve DNS records or diagnostic statistics for this domain.',
    }
    throw error
  }

  const input: DiagnosticsAnalysisInput = {
    domainName: options.domainName,
    score,
    dns,
    stats,
    reportAggregate,
    adminGuides,
  }

  const { systemPrompt, userPrompt } = buildDiagnosticsAnalysisPrompt(input)

  const adapter = resolveProvider()

  const timeoutMs = options.timeoutMs ?? AI_REQUEST_TIMEOUT_MS
  const maxTokens = options.maxTokens ?? 3072
  const temperature = options.temperature ?? 0.2

  let rawResponse
  try {
    rawResponse = await adapter.complete(systemPrompt, userPrompt, {
      timeoutMs,
      maxTokens,
      temperature,
    })
  } catch (err: unknown) {
    throw wrapProviderError(err)
  }

  const insights = parseDiagnosticsInsightsFromContent(rawResponse.content)
  if (!insights) {
    console.error(
      '[ai/diagnostics] MALFORMED_RESPONSE — raw content:',
      rawResponse.content.slice(0, 500),
    )
    const error: AIServiceError = {
      code: 'MALFORMED_RESPONSE',
      message: 'AI produced an unexpected response. Please try again.',
    }
    throw error
  }

  const rolloutPlan = parseDiagnosticsRolloutPlanFromContent(
    rawResponse.content,
  )

  const durationMs = Date.now() - startMs

  console.info(
    JSON.stringify({
      event: 'ai_diagnostics_insights',
      providerId: adapter.providerId,
      domainName: options.domainName,
      domainId: options.domainId,
      durationMs,
      promptLength: userPrompt.length,
      insightsCount: insights.length,
      rolloutPlanSteps: rolloutPlan.length,
      tokensUsed: rawResponse.tokensUsed,
      model: rawResponse.model,
      hasDns: dns !== null,
      hasDiagnosticStats: stats !== null,
      hasReportAggregate: reportAggregate !== null,
      reportCount: reportAggregate?.reportCount ?? 0,
    }),
  )

  return {
    insights,
    rolloutPlan,
    analyzedAt: new Date().toISOString(),
    inputMeta: {
      domainName: options.domainName,
      hasDns: dns !== null,
      hasDiagnosticStats: stats !== null,
      hasReportAggregate: reportAggregate !== null,
      reportCount: reportAggregate?.reportCount,
      orgCount: reportAggregate?.orgCount,
      dateRange: reportAggregate?.dateRange
        ? {
            start: reportAggregate.dateRange.start ?? undefined,
            end: reportAggregate.dateRange.end ?? undefined,
          }
        : undefined,
    },
    metadata: {
      providerId: adapter.providerId,
      model: rawResponse.model,
      durationMs,
    },
  }
}
