'use client'

import type { DiagnosticsRolloutPlanCardProps } from './DiagnosticsRolloutPlanCardProps'
import { renderInlineCode } from './renderInlineCode'

export function DiagnosticsRolloutPlanCard({
  steps,
}: Readonly<DiagnosticsRolloutPlanCardProps>) {
  if (steps.length === 0) return null

  return (
    <div className="space-y-3">
      <div>
        <h4 className="text-sm font-semibold">Rollout Plan</h4>
        <p className="text-muted-foreground text-xs">
          Ordered next steps, highest impact first.
        </p>
      </div>
      <ol className="bg-card list-decimal space-y-2 rounded-lg border p-4 pl-9 text-sm">
        {steps.map((step, i) => (
          <li
            key={`${step.slice(0, 40)}-${i}`}
            className="marker:text-muted-foreground pl-1"
          >
            {renderInlineCode(step)}
          </li>
        ))}
      </ol>
    </div>
  )
}
