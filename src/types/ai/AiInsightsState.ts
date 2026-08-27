import type { AIServiceError } from './AiServiceError'
import type { ReportAnalysisResult } from './ReportAnalysisResult'

export type AiInsightsState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: ReportAnalysisResult }
  | { status: 'error'; error: AIServiceError }
