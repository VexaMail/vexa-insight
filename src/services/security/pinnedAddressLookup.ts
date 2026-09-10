/* eslint-disable promise/prefer-await-to-callbacks -- Node's connector hands
   the lookup a callback; the shape is the interface, not a choice. */
import type { LookupFunction } from 'node:net'

/**
 * A DNS lookup that always answers with the addresses the SSRF guard already
 * approved, whatever the name would resolve to now. This is the piece that
 * closes the rebinding window between the check and the connection.
 */
export function pinnedAddressLookup(
  addresses: readonly string[],
): LookupFunction {
  const pinned = addresses.map((address) => ({
    address,
    family: address.includes(':') ? 6 : 4,
  }))
  return (_hostname, _options, callback) => {
    callback(null, pinned)
  }
}
