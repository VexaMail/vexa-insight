import type { DiagnosticsInsightsState } from '@/types/ai'

export type AiDiagnosticsInsightsBodyProps = {
  readonly isAiConfigured: boolean
  readonly state: DiagnosticsInsightsState
  readonly onAnalyze: () => void
}
