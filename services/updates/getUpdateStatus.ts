import { APP_VERSION } from '@/constants/app'
import { DEFAULT_REPO_SLUG } from '@/constants/updates'
import type { UpdateStatusPublic } from '@/types/updates'
import { getRepoSlugFromEnv, isUpdateAvailable } from '@/utils/updates'
import { getUpdateStateRow } from './getUpdateStateRow'

/**
 * Compose the public update status payload for the API and the UI.
 * Always returns a valid object (synthesizes defaults when no row exists yet).
 */
export function getUpdateStatus(): UpdateStatusPublic {
  const row = getUpdateStateRow()
  let repoSlug = DEFAULT_REPO_SLUG
  try {
    const slug = getRepoSlugFromEnv()
    repoSlug = `${slug.owner}/${slug.repo}`
  } catch {
    // fall back to default
  }
  if (!row) {
    return {
      enabled: true,
      channel: 'stable',
      currentVersion: APP_VERSION,
      latestVersion: null,
      latestUrl: null,
      latestPublishedAt: null,
      latestNotes: null,
      updateAvailable: false,
      lastCheckedAt: null,
      lastError: null,
      repoSlug,
    }
  }
  return {
    enabled: row.enabled,
    channel: row.channel,
    currentVersion: row.currentVersion ?? APP_VERSION,
    latestVersion: row.latestVersion,
    latestUrl: row.latestUrl,
    latestPublishedAt: row.latestPublishedAt
      ? row.latestPublishedAt.toISOString()
      : null,
    latestNotes: row.latestNotes,
    updateAvailable: isUpdateAvailable(
      row.currentVersion ?? APP_VERSION,
      row.latestVersion,
    ),
    lastCheckedAt: row.lastCheckedAt ? row.lastCheckedAt.toISOString() : null,
    lastError: row.lastError,
    repoSlug,
  }
}
