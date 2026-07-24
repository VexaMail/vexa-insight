import type { PollStatusUpdate } from './PollStatusUpdate'

/**
 * Buffers poll-status progress updates and flushes them to the database at a
 * bounded cadence instead of once per email. `report` merges the latest values
 * (last write wins per field); `flush` persists whatever is pending.
 */
export type PollStatusCoalescer = {
  report: (update: PollStatusUpdate, immediate?: boolean) => Promise<void>
  flush: () => Promise<void>
}
