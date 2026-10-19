/**
 * Forward-confirmed reverse DNS: the PTR names of an address, and whether any
 * of them resolves back to the same address. A mail server without a match
 * is treated with suspicion by most receivers.
 */
export type ForwardConfirmedRdns = {
  readonly ptrNames: readonly string[]
  /** The PTR name whose A/AAAA records include the address, if any. */
  readonly confirmedName: string | null
  readonly status: 'confirmed' | 'mismatch' | 'no_ptr' | 'error'
}
