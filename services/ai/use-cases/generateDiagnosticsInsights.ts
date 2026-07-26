import type { DiagnosticsAnalysisResult } from '@/types/ai'
import type {
  AIServiceError,
  GenerateDiagnosticsInsightsOptions,
} from '../contracts'
import { AI_REQUEST_TIMEOUT_MS } from '../core/aiRequestTimeoutMs'
import { resolveProvider } from '../core/resolveProvider'
import { buildDiagnosticsAnalysisPrompt } from '../prompts/buildDiagnosticsAnalysisPrompt'
import { buildDiagnosticsAnalysisInput } from './buildDiagnosticsAnalysisInput'
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

  const input = await buildDiagnosticsAnalysisInput(options)
  const { dns, stats, reportAggregate } = input

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
