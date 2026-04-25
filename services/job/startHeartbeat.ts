import { setPollStatusInDb } from './setPollStatusInDb'

/**
 * Starts a periodic heartbeat that updates lastCheck in poll_status.
 * Returns the interval handle for cleanup.
 */
export function startHeartbeat(): ReturnType<typeof setInterval> {
  return setInterval(() => {
    const doHeartbeat = async () => {
      try {
        await setPollStatusInDb({ lastCheck: new Date() })
      } catch (err) {
        console.error('[ingest] heartbeat failed:', err)
      }
    }
    void doHeartbeat()
  }, 15_000)
}
