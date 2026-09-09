import type { ReportAnalysisResult } from '../contracts'

/** What a report without stored XML yields: nothing to analyze. */
export function emptyReportAnalysisResult(): ReportAnalysisResult {
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
