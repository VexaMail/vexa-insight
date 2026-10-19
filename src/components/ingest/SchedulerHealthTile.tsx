import type { IngestHealthProps } from '@/types/ingest'
import { describeAge, formatHealthTime, schedulerVerdict } from '@/utils/ingest'
import { CalendarClock } from 'lucide-react'
import { HealthFact } from './HealthFact'
import { HealthTile } from './HealthTile'

/** Is ingestion scheduled, and when does it run next. */
export function SchedulerHealthTile({ health }: Readonly<IngestHealthProps>) {
  const scheduled = health.scheduler !== 'idle'
  return (
    <HealthTile
      title="Scheduler"
      icon={<CalendarClock />}
      verdict={schedulerVerdict(health)}
    >
      <HealthFact label="Interval">
        {scheduled
          ? `Every ${String(health.intervalMinutes)} min`
          : 'Off: no mailbox'}
      </HealthFact>
      <HealthFact label="Next run" title={formatHealthTime(health.nextRunAt)}>
        {health.nextRunAt
          ? describeAge(health.nextRunAt, health.now)
          : 'Not scheduled'}
      </HealthFact>
      <HealthFact
        label="Last run"
        title={formatHealthTime(health.runs.lastRunAt)}
      >
        {describeAge(health.runs.lastRunAt, health.now)}
      </HealthFact>
    </HealthTile>
  )
}
