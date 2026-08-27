import {
  UPDATE_CHECK_INTERVAL_HOURS,
  UPDATE_CHECK_STARTUP_DELAY_MS,
} from '@/constants/updates'
import cron from 'node-cron'
import { checkForUpdates } from './checkForUpdates'
import { runStartupCheck } from './runStartupCheck'

/**
 * Schedule the update check: a one-shot run shortly after boot
 * (so first-time installs populate the table without slowing startup),
 * plus a cron at the top of every Nth hour.
 *
 * Idempotent guards live inside checkForUpdates (env + DB opt-out checks),
 * so this function can be called unconditionally from instrumentation.
 */
export function startUpdateCheckScheduler(): void {
  setTimeout(() => {
    void runStartupCheck()
  }, UPDATE_CHECK_STARTUP_DELAY_MS)
  const expr = `0 */${UPDATE_CHECK_INTERVAL_HOURS} * * *`
  cron.schedule(expr, async () => {
    try {
      const result = await checkForUpdates()
      if (!result.ok) {
        console.warn(`[update-check] failed: ${result.error}`)
      }
    } catch (err) {
      console.error('[update-check] unhandled error', err)
    }
  })
}
