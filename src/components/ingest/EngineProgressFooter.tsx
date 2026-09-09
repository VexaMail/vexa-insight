'use client'

import { Clock, Zap } from 'lucide-react'
import type { EngineProgressFooterProps } from './EngineProgressFooterProps'

/** Throughput and ETA line under the progress bar. */
export function EngineProgressFooter({
  statusText,
  processingEmails,
  ratePerSecond,
  etaFormatted,
}: Readonly<EngineProgressFooterProps>) {
  return (
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
  )
}
