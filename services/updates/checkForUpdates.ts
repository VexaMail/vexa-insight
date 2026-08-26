import { APP_VERSION } from '@/constants/app'
import { fireAndForgetDispatch } from '@/services/notifications'
import type { CheckForUpdatesOutcome } from '@/types/updates'
import {
  clampReleaseNotes,
  getRepoSlugFromEnv,
  isUpdateAvailable,
  isUpdateCheckEnabledFromEnv,
  normalizeVersion,
} from '@/utils/updates'
import { fetchLatestRelease } from './fetchLatestRelease'
import { getUpdateStateRow } from './getUpdateStateRow'
import { NoPublishedReleaseError } from './NoPublishedReleaseError'
import { upsertUpdateState } from './upsertUpdateState'

/**
 * Run a single update check: fetches GitHub's latest release, normalizes it,
 * and persists the result (including any error) into the update_state row.
 *
 * Honors both env-level (VEXA_UPDATE_CHECK_ENABLED) and DB-level (`enabled`)
 * opt-outs. Returns a typed outcome rather than throwing.
 */
export async function checkForUpdates(): Promise<CheckForUpdatesOutcome> {
  if (!isUpdateCheckEnabledFromEnv()) {
    return { ok: true, skipped: 'disabled' }
  }
  const dbRow = getUpdateStateRow()
  if (dbRow && dbRow.enabled === false) {
    return { ok: true, skipped: 'disabled' }
  }
  let slug
  try {
    slug = getRepoSlugFromEnv()
  } catch {
    upsertUpdateState({
      currentVersion: APP_VERSION,
      lastErrorAt: new Date(),
      lastError: 'Invalid repo slug configured',
      lastCheckedAt: new Date(),
    })
    return { ok: false, error: 'Invalid repo slug configured' }
  }
  try {
    const release = await fetchLatestRelease(slug, APP_VERSION)
    const latestVersion = normalizeVersion(release.tag_name)
    const publishedAt = release.published_at
      ? new Date(release.published_at)
      : null
    const previousLatest = dbRow?.latestVersion ?? null
    upsertUpdateState({
      currentVersion: APP_VERSION,
      latestVersion,
      latestUrl: release.html_url,
      latestPublishedAt: publishedAt,
      latestNotes: clampReleaseNotes(release.body),
      lastCheckedAt: new Date(),
      lastError: null,
      lastErrorAt: null,
    })
    if (
      latestVersion &&
      latestVersion !== previousLatest &&
      isUpdateAvailable(APP_VERSION, latestVersion)
    ) {
      fireAndForgetDispatch('update.available', {
        currentVersion: APP_VERSION,
        latestVersion,
        latestUrl: release.html_url,
        publishedAt: publishedAt?.toISOString() ?? null,
      })
    }
    return { ok: true }
  } catch (err) {
    if (err instanceof NoPublishedReleaseError) {
      // A repo with no tagged release yet is a normal state, not a failure:
      // record the check and clear any stale error instead of raising one.
      upsertUpdateState({
        currentVersion: APP_VERSION,
        latestVersion: null,
        lastCheckedAt: new Date(),
        lastError: null,
        lastErrorAt: null,
      })
      return { ok: true, skipped: 'no-releases' }
    }
    const message = err instanceof Error ? err.message : 'Unknown error'
    upsertUpdateState({
      currentVersion: APP_VERSION,
      lastError: message,
      lastErrorAt: new Date(),
      lastCheckedAt: new Date(),
    })
    return { ok: false, error: message }
  }
}
