import type { DiagnosticsAnalysisInput } from '../contracts/DiagnosticsAnalysisInput'
import { buildDnsPromptSection } from './buildDnsPromptSection'
import { buildReportAggregatePromptSection } from './buildReportAggregatePromptSection'
import { buildStatsPromptSection } from './buildStatsPromptSection'
import { DIAGNOSTICS_ANALYSIS_SYSTEM } from './diagnosticsAnalysisSystem'

/**
 * Builds system and user prompts for a diagnostics analysis.
 * Composes sections conditionally based on available data sources.
 */
export function buildDiagnosticsAnalysisPrompt(
  input: DiagnosticsAnalysisInput,
): {
  systemPrompt: string
  userPrompt: string
} {
  const sections: string[] = [
    `Analyze the email security posture for domain: ${input.domainName}`,
  ]
  if (input.score) {
    sections.push(
      `CURRENT DOMAIN SCORE: ${input.score.percentage}% (${input.score.grade})`,
    )
  }

  if (input.dns) {
    sections.push(buildDnsPromptSection(input.dns))
  }

  if (input.stats) {
    sections.push(buildStatsPromptSection(input.stats))
  }

  if (input.reportAggregate) {
    sections.push(buildReportAggregatePromptSection(input.reportAggregate))
  }

  if (input.adminGuides.length > 0) {
    sections.push(
      `DETERMINISTIC OPERATOR RUNBOOK ALREADY SHOWN IN UI:\n${input.adminGuides
        .map(
          (guide) =>
            `- [${guide.severity}] ${guide.title}: ${guide.summary} | how to fix: ${guide.howToFix} | verify: ${guide.verifySteps.join(' ; ')}`,
        )
        .join('\n')}`,
    )
  }

  // Data availability note
  const available: string[] = []
  if (input.score) available.push('score')
  if (input.dns) available.push('DNS')
  if (input.stats) available.push('diagnostic stats')
  if (input.reportAggregate) available.push('report aggregate')
  sections.push(`AVAILABLE DATA SOURCES: ${available.join(', ')}`)

  return {
    systemPrompt: DIAGNOSTICS_ANALYSIS_SYSTEM,
    userPrompt: sections.join('\n\n'),
  }
}
