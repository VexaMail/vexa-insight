/**
 * API-key auth is exempt from CSRF: the attacker would need the key to forge
 * the request, so cross-origin replay of an unprivileged user cannot
 * escalate. CSRF only matters for cookie-bearing sessions.
 */
export function hasApiCredentials(request: Request): boolean {
  return Boolean(
    request.headers.get('x-api-key') ||
    request.headers.get('authorization')?.startsWith('Bearer '),
  )
}
