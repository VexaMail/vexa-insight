import { getReportById } from '@/services/reports'
import type {
  GenerateReportInsightsOptions,
  ReportAnalysisResult,
} from '../contracts'
import { AIServiceErrorException } from '../core/AiServiceErrorException'
import { resolveProvider } from '../core/resolveProvider'
import { buildReportAnalysisPrompt } from '../prompts/buildReportAnalysisPrompt'
import { emptyReportAnalysisResult } from './emptyReportAnalysisResult'
import { parseInsightsFromContent } from './parseInsightsFromContent'
import { requestCompletion } from './requestCompletion'
import { resolveRequestOptions } from './resolveRequestOptions'
import { toReportAnalysisInput } from './toReportAnalysisInput'

/**
 * Main orchestrator: fetches report data, builds prompt, calls the AI
 * provider, parses the response, and returns normalized insights.
 */
export async function generateReportInsights(
  options: GenerateReportInsightsOptions,
): Promise<ReportAnalysisResult> {
  const report = await getReportById(options.reportId)
  if (!report) {
    throw new AIServiceErrorException('INSUFFICIENT_DATA', 'Report not found.')
  }
  if (!report.rawXml) return emptyReportAnalysisResult()

  const { systemPrompt, userPrompt } = buildReportAnalysisPrompt(
    toReportAnalysisInput(report, report.rawXml),
  )
  const adapter = resolveProvider()
  const rawResponse = await requestCompletion(
    adapter,
    systemPrompt,
    userPrompt,
    resolveRequestOptions(options, 2048),
  )
  const insights = parseInsightsFromContent(rawResponse.content)
  if (!insights) {
    throw new AIServiceErrorException(
      'MALFORMED_RESPONSE',
      'AI produced an unexpected response. Please try again.',
    )
  }

  console.info(
    JSON.stringify({
      event: 'ai_report_insights',
      providerId: adapter.providerId,
      reportId: options.reportId,
      durationMs: rawResponse.durationMs,
      insightsCount: insights.length,
      tokensUsed: rawResponse.tokensUsed,
      model: rawResponse.model,
    }),
  )

  const { model, durationMs } = rawResponse
  const generatedAt = new Date().toISOString()
  return {
    insights,
    metadata: {
      providerId: adapter.providerId,
      model,
      durationMs,
      generatedAt,
    },
  }
}
