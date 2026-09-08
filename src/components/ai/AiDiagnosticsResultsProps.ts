import type { DiagnosticsAnalysisResult } from '@/types/ai'

export type AiDiagnosticsResultsProps = {
  readonly data: DiagnosticsAnalysisResult
  readonly onAnalyze: () => void
}
