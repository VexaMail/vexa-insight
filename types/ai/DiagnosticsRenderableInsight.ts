import type { EvidenceStrength } from './EvidenceStrength'
import type { InsightSeverity } from './InsightSeverity'
import type { InsightTone } from './InsightTone'

/** Strict, render-safe contract for diagnostics insight cards. */
export type DiagnosticsRenderableInsight = {
  severity: InsightSeverity
  tone: InsightTone
  evidenceStrength: EvidenceStrength
  title: string
  evidence: string
  impact: string
  action: string
  legacyExplanation?: string
  legacyRecommendation?: string | null
  verifyCommand: string | null
  recordHost: string | null
  recordValue: string | null
}
