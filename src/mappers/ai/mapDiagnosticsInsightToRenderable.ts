import type {
  DiagnosticsInsight,
  DiagnosticsRenderableInsight,
} from '@/types/ai'
import { trimmedOrNull } from '@/utils/strings'

import { deriveToneFromSeverity } from './deriveToneFromSeverity'

export function mapDiagnosticsInsightToRenderable(
  raw: DiagnosticsInsight,
): DiagnosticsRenderableInsight {
  return {
    severity: raw.severity,
    tone: raw.tone ?? deriveToneFromSeverity(raw.severity),
    evidenceStrength: raw.evidenceStrength ?? 'medium',
    title: raw.title,
    evidence: (raw.evidence ?? raw.explanation).trim(),
    impact: (raw.impact ?? '').trim(),
    action: (raw.action ?? raw.recommendation ?? '').trim(),
    legacyExplanation: raw.explanation,
    legacyRecommendation: raw.recommendation,
    verifyCommand: trimmedOrNull(raw.verifyCommand),
    recordHost: trimmedOrNull(raw.recordHost),
    recordValue: trimmedOrNull(raw.recordValue),
  }
}
