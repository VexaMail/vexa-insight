import { APP_VERSION } from '@/constants/app'
import type { CheckForUpdatesOutcome } from '@/types/updates'
import { upsertUpdateState } from './upsertUpdateState'

/** Persist a failed check and return the outcome the caller reports. */
export function recordUpdateCheckError(
  message: string,
): CheckForUpdatesOutcome {
  const now = new Date()
  upsertUpdateState({
    currentVersion: APP_VERSION,
    lastError: message,
    lastErrorAt: now,
    lastCheckedAt: now,
  })

  return { ok: false, error: message }
}
