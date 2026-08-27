import type { AIProviderId } from './AiProviderId'
import type { ReportInsight } from './ReportInsight'

export type ReportAnalysisResult = {
  insights: ReportInsight[]
  metadata: {
    providerId: AIProviderId
    model: string
    durationMs: number
    generatedAt: string
  }
}
