import { formatAgo, formatDateTime } from '@/utils/dashboard'
import type { IngestionFactsProps } from './IngestionFactsProps'

/**
 * How long ago mail last arrived: the last successful mailbox poll or the
 * newest stored report, whichever is later.
 */
export function IngestionFreshness({
  health,
  nowMs,
}: Readonly<IngestionFactsProps>) {
  if (health.mailboxFreshAtMs === null) {
    return <span className="text-muted-foreground">No mail received yet</span>
  }
  return (
    <span
      className={
        health.state === 'healthy' ? 'text-success' : 'text-foreground'
      }
      title={`Last poll or newest report: ${formatDateTime(health.mailboxFreshAtMs)}`}
    >
      {formatAgo(health.mailboxFreshAtMs, nowMs)}
    </span>
  )
}
