import { GITHUB_FETCH_TIMEOUT_MS } from '@/constants/updates'
import type { GithubReleaseResponse, RepoSlug } from '@/types/updates'
import { buildLatestReleaseUrl, buildUserAgent } from '@/utils/updates'
import { NoPublishedReleaseError } from './NoPublishedReleaseError'

/**
 * Fetch the latest stable, non-draft release for a repo from the GitHub REST API.
 * Sends only a User-Agent header; never sends auth, cookies, or telemetry.
 */
export async function fetchLatestRelease(
  slug: RepoSlug,
  currentVersion: string,
): Promise<GithubReleaseResponse> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), GITHUB_FETCH_TIMEOUT_MS)
  try {
    const response = await fetch(buildLatestReleaseUrl(slug), {
      method: 'GET',
      headers: {
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'User-Agent': buildUserAgent(currentVersion),
      },
      signal: controller.signal,
      cache: 'no-store',
    })
    if (response.status === 404) {
      throw new NoPublishedReleaseError()
    }
    if (!response.ok) {
      throw new Error(`GitHub API responded with status ${response.status}`)
    }
    const json = (await response.json()) as GithubReleaseResponse
    if (!json || typeof json.tag_name !== 'string') {
      throw new Error('GitHub response missing tag_name')
    }
    return json
  } finally {
    clearTimeout(timeout)
  }
}
