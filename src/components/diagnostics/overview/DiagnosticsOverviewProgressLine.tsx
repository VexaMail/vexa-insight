import { formatCount } from '@/utils/dashboard'
import { Loader2 } from 'lucide-react'
import type { DiagnosticsOverviewProgressProps } from './DiagnosticsOverviewProgressProps'

/**
 * What the index is doing with its stored runs: refreshing the stale ones
 * with a count and a bar, stopped on an error, or simply up to date.
 */
export function DiagnosticsOverviewProgressLine({
  progress,
}: Readonly<DiagnosticsOverviewProgressProps>) {
  const { queued, done, error } = progress
  if (error) {
    return (
      <p role="status" className="text-warning text-xs">
        Checks stopped after {formatCount(done)} of {formatCount(queued)}{' '}
        domains: {error}. Reload the page to try the rest again.
      </p>
    )
  }
  if (done >= queued) {
    return (
      <p className="text-muted-foreground text-xs">
        Every domain was checked within the last day; open one for a live run.
      </p>
    )
  }
  return (
    <div role="status" aria-live="polite" className="space-y-1.5">
      <p className="text-muted-foreground flex items-center gap-2 text-xs">
        <Loader2
          className="text-primary h-3.5 w-3.5 animate-spin motion-reduce:animate-none"
          aria-hidden
        />
        Checking DNS: {formatCount(done)} of {formatCount(queued)} domains. Rows
        update as each batch finishes.
      </p>
      <div className="bg-muted h-1 w-full overflow-hidden rounded-full">
        <div
          className="bg-primary h-full transition-[width] duration-300"
          style={{ width: `${String((done / queued) * 100)}%` }}
        />
      </div>
    </div>
  )
}
