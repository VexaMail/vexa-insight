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
          className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-600 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 print:hidden"
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
