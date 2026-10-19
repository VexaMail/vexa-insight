import { StatusPill } from '@/components/ui'
import { Loader2 } from 'lucide-react'

/** Status pill of one ingestion run: running, succeeded, or failed. */
export function JobRunStatusBadge({
  success,
  isRunning,
}: Readonly<{ success: boolean; isRunning: boolean }>) {
  if (isRunning) {
    return (
      <StatusPill tone="info">
        <Loader2 className="h-3 w-3 animate-spin" aria-hidden="true" />
        Running
      </StatusPill>
    )
  }

  return (
    <StatusPill tone={success ? 'success' : 'danger'} variant="solid" dot>
      {success ? 'Succeeded' : 'Failed'}
    </StatusPill>
  )
}
