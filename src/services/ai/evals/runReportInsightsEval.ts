import type { AiEvalArtifact, AiEvalRun, AiEvalRunOptions } from '../contracts'
import { buildReportAnalysisPrompt } from '../prompts/buildReportAnalysisPrompt'
import { getReportEventSummaries } from '../use-cases/getReportEventSummaries'
import { parseInsightsFromContent } from '../use-cases/parseInsightsFromContent'
import { loadEvalReport } from './loadEvalReport'
import { runOneEvalCall } from './runOneEvalCall'

/**
 * Runs the DMARC report-insights prompt N times against a real local report.
 *
 * Uses the production prompt builder and the production parser, so an edit to
 * `reportAnalysisSystem.ts` shows up here on the next run with nothing else to
 * change. Samples run in sequence rather than in parallel: the subscription
 * lane rate-limits bursts, and a sweep that trips the limit measures the limit
 * instead of the prompt.
 */
export async function runReportInsightsEval(
  reportId: number,
  options: AiEvalRunOptions,
): Promise<AiEvalArtifact> {
  const report = await loadEvalReport(reportId)
  if (!report) throw new Error(`report ${String(reportId)} not found`)
  if (!report.rawXml) {
    throw new Error(`report ${String(reportId)} has no rawXml to analyze`)
  }

  const { systemPrompt, userPrompt } = buildReportAnalysisPrompt({
    reportId: report.id,
    orgName: report.orgName,
    beginDate: report.beginDate,
    endDate: report.endDate,
    rawXml: report.rawXml,
    relatedDomains: report.relatedDomains ?? [],
    events: getReportEventSummaries(report.id),
  })

  const runs: AiEvalRun[] = []
  for (let run = 1; run <= options.runs; run += 1) {
    runs.push(
      await runOneEvalCall(
        run,
        {
          model: options.model,
          systemPrompt,
          userPrompt,
          maxTokens: options.maxTokens,
          timeoutMs: options.timeoutMs,
        },
        parseInsightsFromContent,
      ),
    )
  }

  return {
    target: `report-${String(reportId)}`,
    generatedAt: new Date().toISOString(),
    systemPrompt,
    userPrompt,
    options,
    runs,
  }
}
