import type { AIServiceError, DiagnosticsAnalysisResult } from '@/types/ai'

export type DiagnosticsInsightsState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: DiagnosticsAnalysisResult }
  | { status: 'error'; error: AIServiceError }
