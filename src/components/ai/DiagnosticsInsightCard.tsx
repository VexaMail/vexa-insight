'use client'

import type { DiagnosticsInsightCardProps } from './DiagnosticsInsightCardProps'
import { InsightToneBadge } from './InsightToneBadge'
import { insightToneDot } from './insightToneDot'
import { renderInlineCode } from './renderInlineCode'

export function DiagnosticsInsightCard({
  insight,
}: Readonly<DiagnosticsInsightCardProps>) {
  const showCodeBlock =
    insight.tone === 'improvement' &&
    insight.recordValue !== null &&
    insight.recordValue.length > 0

  const evidenceText = insight.evidence || insight.legacyExplanation || ''
  const actionText = insight.action || insight.legacyRecommendation || ''

  return (
    <div className="bg-card rounded-lg border p-4 shadow-sm">
      {/* Header */}
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
        {/* Evidence */}
        <div className="min-w-0 rounded-md border p-3">
          <p className="text-muted-foreground mb-1 text-xs font-semibold tracking-wider uppercase">
            Why this stands out
          </p>
          <p className="text-sm leading-relaxed">
            {renderInlineCode(evidenceText)}
          </p>
        </div>

        {/* Impact */}
        <div className="min-w-0 rounded-md border p-3">
          <p className="text-muted-foreground mb-1 text-xs font-semibold tracking-wider uppercase">
            Impact
          </p>
          <p className="text-sm leading-relaxed">
            {insight.impact ? (
              renderInlineCode(insight.impact)
            ) : (
              <span className="text-muted-foreground italic">
                No specific impact identified.
              </span>
            )}
          </p>
        </div>

        {/* Action */}
        <div className="min-w-0 rounded-md border p-3">
          <p className="text-muted-foreground mb-1 text-xs font-semibold tracking-wider uppercase">
            Recommended next step
          </p>
          <p className="text-sm leading-relaxed">
            {renderInlineCode(actionText)}
          </p>

          {showCodeBlock && (
            <div className="mt-2 space-y-1.5">
              {insight.recordHost && (
                <div>
                  <p className="text-muted-foreground text-xs">Record:</p>
                  <pre className="overflow-x-auto rounded bg-zinc-100 px-2 py-1 text-xs break-all whitespace-pre-wrap dark:bg-zinc-800">
                    <code>{insight.recordHost}</code>
                  </pre>
                </div>
              )}
              <div>
                <p className="text-muted-foreground text-xs">Value:</p>
                <pre className="overflow-x-auto rounded bg-zinc-100 px-2 py-1 text-xs break-all whitespace-pre-wrap dark:bg-zinc-800">
                  <code>{insight.recordValue}</code>
                </pre>
              </div>
            </div>
          )}

          {insight.verifyCommand && showCodeBlock && (
            <div className="mt-2">
              <p className="text-muted-foreground text-xs">Verify:</p>
              <pre className="overflow-x-auto rounded bg-zinc-100 px-2 py-1 text-xs break-all whitespace-pre-wrap dark:bg-zinc-800">
                <code>{insight.verifyCommand}</code>
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
