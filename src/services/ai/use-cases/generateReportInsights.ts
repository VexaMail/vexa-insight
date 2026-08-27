import { getReportById } from '@/services/reports'
import type {
  GenerateReportInsightsOptions,
  ReportAnalysisResult,
} from '../contracts'
import { AI_REQUEST_TIMEOUT_MS } from '../core/aiRequestTimeoutMs'
import { AIServiceErrorException } from '../core/AiServiceErrorException'
import { resolveProvider } from '../core/resolveProvider'
import { buildReportAnalysisPrompt } from '../prompts/buildReportAnalysisPrompt'
import { getReportEventSummaries } from './getReportEventSummaries'
import { parseInsightsFromContent } from './parseInsightsFromContent'
import { wrapProviderError } from './wrapProviderError'

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

  if (!report.rawXml) {
    return {
      insights: [],
      metadata: {
        providerId: 'openai',
        model: 'none',
        durationMs: 0,
        generatedAt: new Date().toISOString(),
      },
    }
  }

  const events = getReportEventSummaries(report.id)

  const { systemPrompt, userPrompt } = buildReportAnalysisPrompt({
    reportId: report.id,
    orgName: report.orgName,
    beginDate: report.beginDate,
    endDate: report.endDate,
    rawXml: report.rawXml,
    relatedDomains: report.relatedDomains ?? [],
    events,
  })

  const adapter = resolveProvider()

  const timeoutMs = options.timeoutMs ?? AI_REQUEST_TIMEOUT_MS
  const maxTokens = options.maxTokens ?? 2048
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

  return {
    insights,
    metadata: {
      providerId: adapter.providerId,
      model: rawResponse.model,
      durationMs: rawResponse.durationMs,
      generatedAt: new Date().toISOString(),
    },
  }
}
