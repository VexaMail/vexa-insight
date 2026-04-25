import type { DiagnosticsRenderableInsight } from '@/types/ai'

import { sortInsightsBySeverity } from './sortInsightsBySeverity'

/** Groups insights by tone and sorts within each group by severity. */
export function groupInsightsByTone(insights: DiagnosticsRenderableInsight[]): {
  improvements: DiagnosticsRenderableInsight[]
  anomalies: DiagnosticsRenderableInsight[]
  informational: DiagnosticsRenderableInsight[]
} {
  const improvements: DiagnosticsRenderableInsight[] = []
  const anomalies: DiagnosticsRenderableInsight[] = []
  const informational: DiagnosticsRenderableInsight[] = []

  for (const insight of insights) {
    if (insight.tone === 'improvement') improvements.push(insight)
    else if (insight.tone === 'anomaly') anomalies.push(insight)
    else informational.push(insight)
  }

  return {
    improvements: sortInsightsBySeverity(improvements),
    anomalies: sortInsightsBySeverity(anomalies),
    informational: sortInsightsBySeverity(informational),
  }
}
