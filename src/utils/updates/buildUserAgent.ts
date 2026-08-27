import { HTTP_UA_PREFIX } from '@/constants/updates'

/**
 * Build the User-Agent header used for GitHub release requests.
 * GitHub requires a UA on every API call.
 */
export function buildUserAgent(version: string): string {
  return `${HTTP_UA_PREFIX}/${version || '0.0.0'}`
}
