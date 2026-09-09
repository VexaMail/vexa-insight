'use client'

import { EngineProgressFooter } from './EngineProgressFooter'
import { EngineProgressPending } from './EngineProgressPending'
import type { EngineProgressProps } from './EngineProgressProps'
import { getProgressPercent } from './getProgressPercent'

export function EngineProgress({
  currentProcessed,
  totalEmails,
  processingEmails,
  ratePerSecond,
  etaFormatted,
  statusText,
}: Readonly<EngineProgressProps>) {
  const progressPercent = getProgressPercent(currentProcessed, totalEmails)

  if (totalEmails <= 0) {
    return <EngineProgressPending statusText={statusText} />
  }

  return (
    <div className="mt-4" role="status" aria-live="polite">
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="text-foreground font-medium">
          Processing (
          <span className="text-muted-foreground">
            {currentProcessed.toLocaleString()} / {totalEmails.toLocaleString()}
          </span>
          )
        </span>
        <span className="text-foreground font-medium">
          {Math.round(progressPercent)}%
        </span>
      </div>
      <div
        className="bg-secondary h-1.5 w-full overflow-hidden rounded-full"
        aria-valuenow={currentProcessed}
        aria-valuemin={0}
        aria-valuemax={totalEmails}
        role="progressbar"
      >
        <div
          className="bg-primary h-full rounded-full transition-all duration-300 ease-out"
          style={{ width: `${String(progressPercent)}%` }}
        />
      </div>
      <EngineProgressFooter
        statusText={statusText}
        processingEmails={processingEmails}
        ratePerSecond={ratePerSecond}
        etaFormatted={etaFormatted}
      />
    </div>
  )
}
