import { APP_VERSION } from '@/constants/app'
import { upsertUpdateState } from './upsertUpdateState'

/**
 * A repo with no tagged release yet is a normal state, not a failure: record
 * the check and clear any stale error instead of raising one.
 */
export function recordNoPublishedRelease(): void {
  upsertUpdateState({
    currentVersion: APP_VERSION,
    latestVersion: null,
    lastCheckedAt: new Date(),
    lastError: null,
    lastErrorAt: null,
  })
}
