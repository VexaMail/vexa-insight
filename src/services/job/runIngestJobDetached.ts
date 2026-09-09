import { runIngestJob } from './runIngestJob'
import { setPollStatusInDb } from './setPollStatusInDb'

/**
 * Runs the job in the background (fire and forget) so the process is decoupled
 * from the browser connection. The finally block inside runIngestJob clears
 * the running flag; if it fails completely outside that logic, the flag is
 * cleared here so the failure is recorded.
 */
export function runIngestJobDetached(fullRescan: boolean): void {
  void (async () => {
    try {
      await runIngestJob({ fullRescan })
    } catch (err) {
      console.error('[ingest] Background job failed:', err)
      try {
        await setPollStatusInDb({ isRunning: false, lastCheck: new Date() })
      } catch (fallbackErr) {
        console.error(fallbackErr)
      }
    }
  })()
}
