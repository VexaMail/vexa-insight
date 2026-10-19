import type { HealthVerdict, IngestHealth } from '@/types/ingest'

/** Is the scheduler ticking: running now, on schedule, stopped, or off. */
export function schedulerVerdict(
  health: Pick<IngestHealth, 'scheduler' | 'isRunning'>,
): HealthVerdict {
  if (health.isRunning) return { tone: 'info', label: 'Running now' }
  if (health.scheduler === 'idle') {
    return { tone: 'unknown', label: 'Not scheduled' }
  }
  if (health.scheduler === 'stale') {
    return { tone: 'danger', label: 'Missed runs' }
  }
  return { tone: 'success', label: 'On schedule' }
}
