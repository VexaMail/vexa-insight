import type { DiagnosticsInsightCategory } from './DiagnosticsInsightCategory'
import type { EvidenceStrength } from './EvidenceStrength'
import type { InsightSeverity } from './InsightSeverity'
import type { InsightTone } from './InsightTone'

export type DiagnosticsInsight = {
  category: DiagnosticsInsightCategory
  severity: InsightSeverity
  tone?: InsightTone
  evidenceStrength?: EvidenceStrength
  title: string
  explanation: string
  evidence?: string
  impact?: string
  action?: string
  recommendation: string | null
  verifyCommand?: string | null
  recordHost?: string | null
  recordValue?: string | null
}
