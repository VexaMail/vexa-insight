import type { ActionItem, IngestionHealth } from '@/types/dashboard'
import { msToSeconds } from './msToSeconds'

/** Queues ingestion that failed, stalled or is not scheduled at all. */
export function ingestionActions(health: IngestionHealth): ActionItem[] {
  const base = {
    subject: 'Ingestion',
    href: '/ingest',
    impactMessages: null,
    impactRate: null,
  }
  if (health.state === 'failing') {
    return [
      {
        ...base,
        id: 'ingestion:failing',
        severity: 'critical',
        issue: 'Last ingestion run failed',
        detail: health.lastRunError ?? 'The run ended with errors.',
        lastSeenAt: msToSeconds(health.lastRunAtMs),
        isNew: true,
      },
    ]
  }
  if (health.state === 'stalled') {
    return [
      {
        ...base,
        id: 'ingestion:stalled',
        severity: 'critical',
        issue: 'Ingestion stalled',
        detail: `No successful run for ${String(health.intervalMinutes)}-minute schedule in over three intervals.`,
        lastSeenAt: msToSeconds(health.lastSuccessAtMs),
        isNew: true,
      },
    ]
  }
  if (health.state !== 'not_scheduled') return []
  return [
    {
      ...base,
      id: 'ingestion:not-scheduled',
      severity: 'info',
      issue: 'Ingestion not scheduled',
      detail: 'No IMAP account is configured; reports arrive only by upload.',
      lastSeenAt: null,
      isNew: false,
    },
  ]
}
