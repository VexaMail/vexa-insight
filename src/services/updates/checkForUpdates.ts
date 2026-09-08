import { APP_VERSION } from '@/constants/app'
import type { CheckForUpdatesOutcome } from '@/types/updates'
import {
  getRepoSlugFromEnv,
  isUpdateCheckEnabledFromEnv,
} from '@/utils/updates'
import { fetchLatestRelease } from './fetchLatestRelease'
import { getUpdateStateRow } from './getUpdateStateRow'
import { NoPublishedReleaseError } from './NoPublishedReleaseError'
import { recordLatestRelease } from './recordLatestRelease'
import { recordNoPublishedRelease } from './recordNoPublishedRelease'
import { recordUpdateCheckError } from './recordUpdateCheckError'

/**
 * Run a single update check: fetches GitHub's latest release, normalizes it,
 * and persists the result (including any error) into the update_state row.
 *
 * Honors both env-level (VEXA_UPDATE_CHECK_ENABLED) and DB-level (`enabled`)
 * opt-outs. Returns a typed outcome rather than throwing.
 */
export async function checkForUpdates(): Promise<CheckForUpdatesOutcome> {
  if (!isUpdateCheckEnabledFromEnv()) return { ok: true, skipped: 'disabled' }

  const dbRow = getUpdateStateRow()
  if (dbRow && !dbRow.enabled) return { ok: true, skipped: 'disabled' }

  let slug
  try {
    slug = getRepoSlugFromEnv()
  } catch {
    return recordUpdateCheckError('Invalid repo slug configured')
  }

  try {
    const release = await fetchLatestRelease(slug, APP_VERSION)
    recordLatestRelease(release, dbRow?.latestVersion ?? null)
    return { ok: true }
  } catch (err) {
    if (err instanceof NoPublishedReleaseError) {
      recordNoPublishedRelease()
      return { ok: true, skipped: 'no-releases' }
    }
    return recordUpdateCheckError(
      err instanceof Error ? err.message : 'Unknown error',
    )
  }
}
