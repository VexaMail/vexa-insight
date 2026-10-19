import { STALLED_INTERVAL_FACTOR } from '@/constants/dashboard'
import type { IngestionHealthInput, IngestionState } from '@/types/dashboard'

/**
 * Running, failing (latest run failed), not scheduled (no IMAP account),
 * stalled (no successful run in three intervals) or healthy, in that order.
 */
export function ingestionState(input: IngestionHealthInput): IngestionState {
  if (input.isRunning) return 'running'
  if (input.latestRun && !input.latestRun.success) return 'failing'
  if (!input.hasImapAccount || input.intervalMinutes < 1) return 'not_scheduled'
  const allowedMs = input.intervalMinutes * 60_000 * STALLED_INTERVAL_FACTOR
  if (input.lastSuccessAtMs === null) return 'stalled'
  return input.nowMs - input.lastSuccessAtMs > allowedMs ? 'stalled' : 'healthy'
}
