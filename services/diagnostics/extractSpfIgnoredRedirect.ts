import { extractSpfLookupMechanisms } from './extractSpfLookupMechanisms'
import { hasSpfAllMechanism } from './hasSpfAllMechanism'

/**
 * Returns the target of a `redirect=` modifier that RFC 7208 section 6.1
 * requires receivers to ignore, because the record also carries an `all`
 * mechanism. Returns null when there is no redirect, or when the redirect is
 * live (no `all` present).
 *
 * Dead configuration worth surfacing: operators commonly add a redirect and
 * leave an `all` in place, then wonder why the redirect target's senders fail.
 */
export function extractSpfIgnoredRedirect(record: string): string | null {
  if (!hasSpfAllMechanism(record)) return null

  const redirect = extractSpfLookupMechanisms(record).find((term) =>
    term.startsWith('redirect='),
  )
  if (redirect === undefined) return null

  const target = redirect.slice('redirect='.length)
  return target.length > 0 ? target : null
}
