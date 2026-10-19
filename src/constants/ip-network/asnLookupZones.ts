/**
 * DNS zones of the public IP-to-ASN mapping run by Team Cymru: a TXT query for
 * the reversed address under `origin`/`origin6` answers
 * `ASN | prefix | CC | registry | date`, and one for `AS<n>` under `asn`
 * answers the holder's name. Plain DNS, no account or key.
 */
export const ASN_LOOKUP_ZONES = {
  origin4: 'origin.asn.cymru.com',
  origin6: 'origin6.asn.cymru.com',
  names: 'asn.cymru.com',
} as const
