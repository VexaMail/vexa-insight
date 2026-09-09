'use client'

import { Zap } from 'lucide-react'
import type { EngineProgressPendingProps } from './EngineProgressPendingProps'

/** The indeterminate bar shown before the total is known. */
export function EngineProgressPending({
  statusText,
}: Readonly<EngineProgressPendingProps>) {
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
