import type { AIServiceError, ReportAnalysisResult } from '@/types/ai'

export type AiInsightsState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: ReportAnalysisResult }
  | { status: 'error'; error: AIServiceError }
