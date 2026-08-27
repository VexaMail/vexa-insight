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
  const timeout = setTimeout(() => {
    controller.abort()
  }, GITHUB_FETCH_TIMEOUT_MS)
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
      throw new Error(
        `GitHub API responded with status ${String(response.status)}`,
      )
    }
    const json: unknown = await response.json()
    if (typeof json !== 'object' || json === null) {
      throw new Error('GitHub response has an invalid release payload')
    }
    if (
      !('tag_name' in json) ||
      !('name' in json) ||
      !('body' in json) ||
      !('html_url' in json) ||
      !('published_at' in json) ||
      !('draft' in json) ||
      !('prerelease' in json)
    ) {
      throw new Error('GitHub response has an invalid release payload')
    }
    const { tag_name, name, body, html_url, published_at, draft, prerelease } =
      json
    if (
      typeof tag_name !== 'string' ||
      (name !== null && typeof name !== 'string') ||
      (body !== null && typeof body !== 'string') ||
      typeof html_url !== 'string' ||
      (published_at !== null && typeof published_at !== 'string') ||
      typeof draft !== 'boolean' ||
      typeof prerelease !== 'boolean'
    ) {
      throw new Error('GitHub response has an invalid release payload')
    }
    return { tag_name, name, body, html_url, published_at, draft, prerelease }
  } finally {
    clearTimeout(timeout)
  }
}
