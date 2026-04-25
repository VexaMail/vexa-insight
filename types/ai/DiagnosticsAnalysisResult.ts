import type { AIProviderId } from './AiProviderId'
import type { DiagnosticsInsight } from './DiagnosticsInsight'

export type DiagnosticsAnalysisResult = {
  insights: DiagnosticsInsight[]
  summary?: string | undefined
  analyzedAt: string
  inputMeta: {
    domainName: string
    hasDns: boolean
    hasDiagnosticStats: boolean
    hasReportAggregate: boolean
    reportCount?: number | undefined
    orgCount?: number | undefined
    dateRange?:
      | {
          start?: string | undefined
          end?: string | undefined
        }
      | undefined
  }
  metadata: {
    providerId: AIProviderId
    model: string
    durationMs: number
  }
}
