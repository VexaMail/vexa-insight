import { checkForUpdates } from './checkForUpdates'

/**
 * Helper used by the scheduler to wrap the startup-time check.
 * Catches errors so they never bubble out of `setTimeout`.
 */
export async function runStartupCheck(): Promise<void> {
  try {
    await checkForUpdates()
  } catch (err) {
    console.error('[update-check] startup run failed', err)
  }
}
