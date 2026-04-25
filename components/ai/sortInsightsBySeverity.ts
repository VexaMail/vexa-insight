import type { DiagnosticsRenderableInsight } from '@/types/ai'

import { EVIDENCE_ORDER } from './evidenceOrder'
import { SEVERITY_ORDER } from './severityOrder'

/** Sorts insights by severity desc, then evidence strength desc. */
export function sortInsightsBySeverity(
  insights: DiagnosticsRenderableInsight[],
): DiagnosticsRenderableInsight[] {
  return [...insights].sort((a, b) => {
    const sevDiff = SEVERITY_ORDER[b.severity] - SEVERITY_ORDER[a.severity]
    if (sevDiff !== 0) return sevDiff
    return (
      (EVIDENCE_ORDER[b.evidenceStrength] ?? 0) -
      (EVIDENCE_ORDER[a.evidenceStrength] ?? 0)
    )
  })
}
