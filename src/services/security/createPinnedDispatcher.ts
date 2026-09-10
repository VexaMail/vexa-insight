import { Agent } from 'undici'
import { pinnedAddressLookup } from './pinnedAddressLookup'

/**
 * Builds a dispatcher that connects only to the addresses the SSRF guard
 * already checked.
 *
 * Validating a hostname and then handing that hostname to `fetch` leaves a
 * gap: the request performs its own DNS lookup, and a name that answered with
 * a public address during the check can answer with `169.254.169.254` a
 * moment later. Pinning the lookup closes the window, while the hostname
 * still governs the TLS certificate and the `Host` header, so the connection
 * is not weakened in exchange.
 */
export function createPinnedDispatcher(addresses: readonly string[]): Agent {
  return new Agent({ connect: { lookup: pinnedAddressLookup(addresses) } })
}
