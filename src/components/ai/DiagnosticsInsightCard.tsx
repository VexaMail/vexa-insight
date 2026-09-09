'use client'

import type { DiagnosticsInsightCardProps } from './DiagnosticsInsightCardProps'
import { DiagnosticsInsightRecordDetails } from './DiagnosticsInsightRecordDetails'
import { InsightCardSection } from './InsightCardSection'
import { InsightToneBadge } from './InsightToneBadge'
import { insightToneDot } from './insightToneDot'
import { renderInlineCode } from './renderInlineCode'

export function DiagnosticsInsightCard({
  insight,
}: Readonly<DiagnosticsInsightCardProps>) {
  const evidenceText = insight.evidence || insight.legacyExplanation || ''
  const actionText = insight.action || insight.legacyRecommendation || ''

  return (
    <div className="bg-card rounded-lg border p-4 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span
            className={`mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full ${insightToneDot(insight.tone)}`}
            aria-hidden="true"
          />
          <h4 className="text-sm font-semibold">{insight.title}</h4>
        </div>
        <InsightToneBadge tone={insight.tone} />
      </div>

      {/* Structured body — stacks on small/medium, 3-col at xl */}
      <div className="mt-3 grid grid-cols-1 gap-3 xl:grid-cols-3">
        <InsightCardSection title="Why this stands out">
          <p className="text-sm leading-relaxed">
            {renderInlineCode(evidenceText)}
          </p>
        </InsightCardSection>
        <InsightCardSection title="Impact">
          <p className="text-sm leading-relaxed">
            {insight.impact ? (
              renderInlineCode(insight.impact)
            ) : (
              <span className="text-muted-foreground italic">
                No specific impact identified.
              </span>
            )}
          </p>
        </InsightCardSection>
        <InsightCardSection title="Recommended next step">
          <p className="text-sm leading-relaxed">
            {renderInlineCode(actionText)}
          </p>
          <DiagnosticsInsightRecordDetails insight={insight} />
        </InsightCardSection>
      </div>
    </div>
  )
}
