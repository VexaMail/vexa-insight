import type { DiagnosticsAnalysisResult } from '@/types/ai'
import type { GenerateDiagnosticsInsightsOptions } from '../contracts'
import { resolveProvider } from '../core/resolveProvider'
import { buildDiagnosticsAnalysisPrompt } from '../prompts/buildDiagnosticsAnalysisPrompt'
import { buildDiagnosticsAnalysisInput } from './buildDiagnosticsAnalysisInput'
import { buildDiagnosticsInputMeta } from './buildDiagnosticsInputMeta'
import { parseDiagnosticsInsightsOrThrow } from './parseDiagnosticsInsightsOrThrow'
import { parseDiagnosticsRolloutPlanFromContent } from './parseDiagnosticsRolloutPlanFromContent'
import { requestCompletion } from './requestCompletion'
import { resolveRequestOptions } from './resolveRequestOptions'

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
  const { systemPrompt, userPrompt } = buildDiagnosticsAnalysisPrompt(input)
  const adapter = resolveProvider()
  const rawResponse = await requestCompletion(
    adapter,
    systemPrompt,
    userPrompt,
    resolveRequestOptions(options, 3072),
  )
  const insights = parseDiagnosticsInsightsOrThrow(rawResponse.content)
  const rolloutPlan = parseDiagnosticsRolloutPlanFromContent(
    rawResponse.content,
  )
  const durationMs = Date.now() - startMs
  const inputMeta = buildDiagnosticsInputMeta(input)

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
      hasDns: inputMeta.hasDns,
      hasDiagnosticStats: inputMeta.hasDiagnosticStats,
      hasReportAggregate: inputMeta.hasReportAggregate,
      reportCount: inputMeta.reportCount ?? 0,
    }),
  )

  return {
    insights,
    rolloutPlan,
    analyzedAt: new Date().toISOString(),
    inputMeta,
    metadata: {
      providerId: adapter.providerId,
      model: rawResponse.model,
      durationMs,
    },
  }
}
