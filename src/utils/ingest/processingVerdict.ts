import type { HealthVerdict, IngestRunHealth } from '@/types/ingest'

/** Did the last run succeed, and did any run of the last day fail. */
export function processingVerdict(runs: IngestRunHealth): HealthVerdict {
  if (runs.lastRunAt === null) return { tone: 'unknown', label: 'No runs yet' }
  if (runs.lastRunSuccess === false) {
    return { tone: 'danger', label: 'Last run failed' }
  }
  if (runs.lastErrorCount > 0 || runs.failedRuns24h > 0) {
    return { tone: 'warning', label: 'Errors logged' }
  }
  return { tone: 'success', label: 'Clean' }
}
