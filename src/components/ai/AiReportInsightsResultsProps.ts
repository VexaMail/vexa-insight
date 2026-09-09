import type { ReportAnalysisResult } from '@/types/ai'

export type AiReportInsightsResultsProps = {
  readonly result: ReportAnalysisResult
  readonly onReanalyze: () => void
}
