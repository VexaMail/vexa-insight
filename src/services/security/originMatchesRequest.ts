/**
 * Whether the Origin header names the host the request was sent to; an
 * unparsable value never matches.
 */
export function originMatchesRequest(
  origin: string,
  requestUrl: string,
): boolean {
  try {
    return new URL(origin).host === new URL(requestUrl).host
  } catch {
    return false
  }
}
