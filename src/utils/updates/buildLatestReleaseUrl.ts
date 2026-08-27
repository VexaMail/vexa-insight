import { GITHUB_RELEASES_URL_BASE } from '@/constants/updates'
import type { RepoSlug } from '@/types/updates'

/**
 * Build the GitHub REST endpoint that returns the most recent
 * non-draft, non-prerelease release for a given repo slug.
 */
export function buildLatestReleaseUrl(slug: RepoSlug): string {
  return `${GITHUB_RELEASES_URL_BASE}/${slug.owner}/${slug.repo}/releases/latest`
}
