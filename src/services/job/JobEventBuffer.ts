import type { EmailProgressPayload } from '@/types/dashboard'

/**
 * Buffers per-email job_poll_events rows and flushes them as multi-row inserts
 * instead of one INSERT per email per step. `add` queues a payload; `flush`
 * writes whatever is queued.
 */
export type JobEventBuffer = {
  add: (payload: EmailProgressPayload) => Promise<void>
  flush: () => Promise<void>
}
