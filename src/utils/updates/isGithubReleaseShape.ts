import type { GithubReleaseResponse } from '@/types/updates'
import { isNullableString } from './isNullableString'

/** True when an untrusted payload carries every release field this app reads. */
export function isGithubReleaseShape(
  json: unknown,
): json is GithubReleaseResponse {
  if (typeof json !== 'object' || json === null) return false

  const release = json as Record<string, unknown>

  return (
    typeof release.tag_name === 'string' &&
    typeof release.html_url === 'string' &&
    typeof release.draft === 'boolean' &&
    typeof release.prerelease === 'boolean' &&
    [release.name, release.body, release.published_at].every(isNullableString)
  )
}
