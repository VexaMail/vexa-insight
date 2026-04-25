import type {
  DiagnosticRecommendation,
  DiagnosticStats,
} from '@/types/diagnostics'

export type DiagnosticsOverallAssessmentProps = {
  stats: DiagnosticStats
  dmarcPolicy: string | null
  fallbackRecommendations: DiagnosticRecommendation[]
  hasAiInsights: boolean
}
