import { INVALID_RELEASE_PAYLOAD_MESSAGE } from '@/constants/updates'
import type { GithubReleaseResponse } from '@/types/updates'
import { isGithubReleaseShape } from './isGithubReleaseShape'

/**
 * Narrow an untrusted GitHub release payload to the fields this app reads.
 * Throws rather than returning a partial object: a release missing any of them
 * cannot be compared against the running version.
 */
export function parseGithubRelease(json: unknown): GithubReleaseResponse {
  if (!isGithubReleaseShape(json)) {
    throw new Error(INVALID_RELEASE_PAYLOAD_MESSAGE)
  }

  return json
}
