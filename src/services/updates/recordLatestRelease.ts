import { APP_VERSION } from '@/constants/app'
import { fireAndForgetDispatch } from '@/services/notifications'
import type { GithubReleaseResponse } from '@/types/updates'
import {
  clampReleaseNotes,
  isUpdateAvailable,
  normalizeVersion,
} from '@/utils/updates'
import { upsertUpdateState } from './upsertUpdateState'

/**
 * Persist a fetched release and notify once per newly seen version: a version
 * already recorded as latest has been announced already.
 */
export function recordLatestRelease(
  release: GithubReleaseResponse,
  previousLatest: string | null,
): void {
  const latestVersion = normalizeVersion(release.tag_name)
  const publishedAt = release.published_at
    ? new Date(release.published_at)
    : null

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
}
