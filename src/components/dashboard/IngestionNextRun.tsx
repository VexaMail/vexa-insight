import { formatDateTime, formatRelativeMinutes } from '@/utils/dashboard'
import type { IngestionFactsProps } from './IngestionFactsProps'

/** "In 32 minutes (Oct 19, 2026, 4:00 AM)", or why there is none. */
export function IngestionNextRun({
  health,
  nowMs,
}: Readonly<IngestionFactsProps>) {
  if (health.nextRunAtMs === null) {
    return <span className="text-muted-foreground">None scheduled</span>
  }
  return (
    <span>
      {formatRelativeMinutes(health.nextRunAtMs, nowMs)}{' '}
      <span className="text-muted-foreground font-mono text-[13px]">
        ({formatDateTime(health.nextRunAtMs)})
      </span>
    </span>
  )
}
