import type { PollStatusCoalescer } from './PollStatusCoalescer'
import type { PollStatusUpdate } from './PollStatusUpdate'
import { setPollStatusInDb } from './setPollStatusInDb'

/**
 * Creates a coalescer that turns the per-email progress stream (up to millions
 * of calls) into a few hundred `poll_status` writes.
 *
 * Progress fields (currentProcessed, totalEmails, processingEmails, etaMs,
 * statusText) are last-write-wins, so buffering only the latest value and
 * flushing on a bounded interval loses no meaningful information while removing
 * the per-email fsync that made large ingests take hours. Callers pass
 * `immediate` for transitions the UI must see at once (status text, abort,
 * job start/end).
 */
export function createPollStatusCoalescer(): PollStatusCoalescer {
  // Flush at most this often on the time axis, and at least this often on the
  // volume axis, so poll_status writes stay bounded regardless of throughput.
  const FLUSH_INTERVAL_MS = 500
  const FLUSH_EVERY_N_REPORTS = 500

  let pending: PollStatusUpdate = {}
  let dirty = false
  let reportsSinceFlush = 0
  let lastFlushMs = Date.now()

  async function flush(): Promise<void> {
    if (!dirty) return
    const toWrite = pending
    pending = {}
    dirty = false
    reportsSinceFlush = 0
    lastFlushMs = Date.now()
    await setPollStatusInDb(toWrite)
  }

  async function report(
    update: PollStatusUpdate,
    immediate = false,
  ): Promise<void> {
    pending = { ...pending, ...update }
    dirty = true
    reportsSinceFlush += 1

    const dueByVolume = reportsSinceFlush >= FLUSH_EVERY_N_REPORTS
    const dueByTime = Date.now() - lastFlushMs >= FLUSH_INTERVAL_MS

    if (immediate || dueByVolume || dueByTime) {
      await flush()
    }
  }

  return { report, flush }
}
