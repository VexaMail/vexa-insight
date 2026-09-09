import { formatEta } from '@/utils/format'
import { Clock, Zap } from 'lucide-react'
import type { PollStatusProgressProps } from './PollStatusProgressProps'

/** Progress bar with concurrency and ETA, shown while a poll runs. */
export function PollStatusProgress({
  percent,
  processingEmails,
  etaMs,
}: Readonly<PollStatusProgressProps>) {
  return (
    <>
      <div className="bg-secondary h-1.5 w-full overflow-hidden rounded-full">
        <div
          className="bg-primary h-full rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${String(percent)}%` }}
        />
      </div>
      <div className="text-muted-foreground flex items-center justify-between text-xs">
        <div className="flex items-center gap-1">
          <Zap className="h-3 w-3" />
          <span>
            Concurrency:{' '}
            <strong className="text-foreground">{processingEmails}</strong>
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          <span>
            ETA: <strong className="text-foreground">{formatEta(etaMs)}</strong>
          </span>
        </div>
      </div>
    </>
  )
}
