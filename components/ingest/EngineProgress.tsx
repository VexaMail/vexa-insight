'use client'

import { Clock, Zap } from 'lucide-react'
import { getProgressPercent } from './getProgressPercent'

export function EngineProgress({
  currentProcessed,
  totalEmails,
  processingEmails,
  ratePerSecond,
  etaFormatted,
  statusText,
}: Readonly<{
  currentProcessed: number
  totalEmails: number
  processingEmails: number
  ratePerSecond: number
  etaFormatted: string
  statusText?: string | null
}>) {
  const progressPercent = getProgressPercent(currentProcessed, totalEmails)

  if (totalEmails <= 0) {
    return (
      <div className="mt-4" role="status" aria-live="polite">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-foreground font-medium">
            {statusText ? statusText : 'Calculating total emails to process…'}
          </span>
        </div>
        <div className="bg-secondary h-1.5 w-full overflow-hidden rounded-full">
          <div className="bg-primary h-full w-1/3 animate-pulse rounded-full" />
        </div>
        <div className="text-muted-foreground mt-2 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1">
            <Zap className="h-3 w-3" />
            <span>
              {statusText ? 'Working...' : 'Connecting to mail servers…'}
            </span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-4" role="status" aria-live="polite">
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="text-foreground font-medium">
          <>
            Processing (
            <span className="text-muted-foreground">
              {currentProcessed.toLocaleString()} /{' '}
              {totalEmails.toLocaleString()}
            </span>
            )
          </>
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
          style={{ width: `${progressPercent}%` }}
        />
      </div>
      <div className="text-muted-foreground mt-2 flex flex-col gap-1 text-xs">
        {statusText ? (
          <div className="text-foreground/70 truncate">{statusText}</div>
        ) : null}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Zap className="h-3 w-3" />
            <span>
              {processingEmails} email
              {processingEmails === 1 ? '' : 's'} · {ratePerSecond.toFixed(2)}{' '}
              msg/s
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>ETA {etaFormatted}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
