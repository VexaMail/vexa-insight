import { REDIRECT_STATUSES } from './redirectStatuses'

/**
 * Return the absolute URL a redirect response points at, resolved against the
 * URL that produced it, or null when the response is not a redirect or has no
 * `Location` header. A `Location` that cannot be parsed is returned verbatim so
 * the caller's target check rejects it with a typed error.
 */
export function resolveRedirectTarget(
  response: Response,
  currentUrl: string,
): string | null {
  if (!REDIRECT_STATUSES.has(response.status)) return null
  const location = response.headers.get('location')
  if (location === null) return null
  try {
    return new URL(location, currentUrl).href
  } catch {
    return location
  }
}
