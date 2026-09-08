'use client'

import type { EngineSummaryProps } from '@/types/ingest'

/** Schedule and last run, plus a live processed count while a job is up. */
export function EngineSummary({
  scheduleText,
  lastRunFormatted,
  currentProcessed,
  isRunning,
  runRequested,
}: EngineSummaryProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Schedule</span>
        <span className="text-foreground font-medium">{scheduleText}</span>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Last run</span>
        <span className="text-foreground font-medium">{lastRunFormatted}</span>
      </div>
      {isRunning || runRequested ? (
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Processed</span>
          <span className="text-foreground font-medium">
            {currentProcessed.toLocaleString()}
            {runRequested && !isRunning ? ' (starting…)' : ''}
          </span>
        </div>
      ) : null}
    </div>
  )
}
