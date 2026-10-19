/** The network an address is announced from, per a public IP-to-ASN service. */
export type AsnInfo = {
  readonly asn: number
  /** The announced prefix the address falls in, e.g. `192.0.2.0/24`. */
  readonly prefix: string | null
  readonly registry: string | null
  readonly countryCode: string | null
  /** The AS holder's name as registered, e.g. `EXAMPLE-NET, US`. */
  readonly name: string | null
}
