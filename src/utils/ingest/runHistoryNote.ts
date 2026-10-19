import type { IngestHealth } from '@/types/ingest'

/**
 * Why runs can be listed while no mailbox is configured: they are history
 * from an earlier setup, and no new one can fetch anything until one exists.
 */
export function runHistoryNote(
  health: Pick<IngestHealth, 'mailboxes' | 'runs'>,
): string | undefined {
  if (health.mailboxes.length > 0 || !health.runs.lastRunAt) return undefined
  return 'History only: no mailbox is configured now, so no new run fetches mail.'
}
