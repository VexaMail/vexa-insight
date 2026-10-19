'use client'

import type { AiDiagnosticsIdleCardProps } from './AiDiagnosticsIdleCardProps'
import { AiInsightsHeading } from './AiInsightsHeading'

/** Invitation to run the analysis, shown before the first request. */
export function AiDiagnosticsIdleCard({
  onAnalyze,
}: AiDiagnosticsIdleCardProps) {
  return (
    <div className="bg-card rounded-lg border p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AiInsightsHeading />
        </div>
        <button
          type="button"
          onClick={onAnalyze}
          className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:outline-ring rounded-md px-4 py-2 text-sm font-medium shadow-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 print:hidden"
        >
          Analyze Domain
        </button>
      </div>
      <p className="text-muted-foreground mt-2 text-sm">
        The runbook above explains what to fix and how to validate it. AI adds
        correlation across DNS, historical statistics, and DMARC reports to
        prioritize less obvious causes.
      </p>
    </div>
  )
}
