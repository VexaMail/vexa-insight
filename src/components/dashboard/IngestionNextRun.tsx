import { formatDateTime, formatRelativeMinutes } from '@/utils/dashboard'
import type { IngestionFactsProps } from './IngestionFactsProps'

/** "Next run in 32 minutes", or why there is none. */
export function IngestionNextRun({
  health,
  nowMs,
}: Readonly<Pick<IngestionFactsProps, 'health' | 'nowMs'>>) {
  if (health.nextRunAtMs === null) return <span>No run scheduled</span>
  return (
    <span title={formatDateTime(health.nextRunAtMs)}>
      Next run {formatRelativeMinutes(health.nextRunAtMs, nowMs)}
    </span>
  )
}
