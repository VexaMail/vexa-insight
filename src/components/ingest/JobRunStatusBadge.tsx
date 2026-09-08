import { cn } from '@/lib/utils'
import { CheckCircle, Loader2, XCircle } from 'lucide-react'

/** Status pill of one ingestion run: running, OK, or failed. */
export function JobRunStatusBadge({
  success,
  isRunning,
}: Readonly<{ success: boolean; isRunning: boolean }>) {
  if (isRunning) {
    return (
      <span className="bg-info/10 text-info inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium">
        <Loader2 className="h-3 w-3 animate-spin" />
        Running
      </span>
    )
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium',
        success ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger',
      )}
    >
      {success ? (
        <CheckCircle className="h-3 w-3" />
      ) : (
        <XCircle className="h-3 w-3" />
      )}
      {success ? 'OK' : 'Failed'}
    </span>
  )
}
