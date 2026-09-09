import { parseSafeFetchUrl } from './parseSafeFetchUrl'
import { resolvePublicAddresses } from './resolvePublicAddresses'
import type { SafeFetchTargetCheck } from './SafeFetchTargetCheck'

/**
 * Inspect a URL for SSRF safety. Returns either:
 *   - a parsed URL plus the resolved addresses (success), or
 *   - a failure SafeFetchResult ready to return.
 *
 * Allowed schemes are http: and https: only.
 */
export async function checkSafeFetchTarget(
  rawUrl: string,
): Promise<SafeFetchTargetCheck> {
  const parsed = parseSafeFetchUrl(rawUrl)
  if (!parsed.ok) return parsed

  const resolved = await resolvePublicAddresses(parsed.url.hostname)
  if (!resolved.ok) return resolved

  return { ok: true, url: parsed.url, addresses: resolved.addresses }
}
