import { INGEST_STALE_GRACE_MS } from '@/constants/health'

/**
 * How long without a new ingest run before the scheduler counts as stopped:
 * two missed intervals plus a grace for a slow run. Failed runs still count
 * as runs, so an unreachable mailbox does not read as a dead scheduler.
 */
export function computeIngestStaleAfterMs(intervalMinutes: number): number {
  return 2 * intervalMinutes * 60 * 1000 + INGEST_STALE_GRACE_MS
}
