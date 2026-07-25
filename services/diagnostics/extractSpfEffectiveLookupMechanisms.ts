import { extractSpfLookupMechanisms } from './extractSpfLookupMechanisms'
import { hasSpfAllMechanism } from './hasSpfAllMechanism'

/**
 * The lookup mechanisms a receiver will actually evaluate.
 *
 * Same as `extractSpfLookupMechanisms`, minus any `redirect=` modifier that
 * RFC 7208 section 6.1 requires be ignored because the record also has an
 * `all` mechanism. An ignored redirect is never evaluated, so it issues no DNS
 * query and does not count toward the 10-lookup limit.
 */
export function extractSpfEffectiveLookupMechanisms(record: string): string[] {
  const mechanisms = extractSpfLookupMechanisms(record)
  if (!hasSpfAllMechanism(record)) return mechanisms
  return mechanisms.filter((term) => !term.startsWith('redirect='))
}
