import type { AIServiceError } from './AiServiceError'
import type { DiagnosticsAnalysisResult } from './DiagnosticsAnalysisResult'

export type DiagnosticsInsightsState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: DiagnosticsAnalysisResult }
  | { status: 'error'; error: AIServiceError }
