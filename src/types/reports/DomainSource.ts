/**
 * Source IP with message count for a domain.
 */
export type DomainSource = {
  sourceIp: string
  count: number
  countryCode?: string | undefined
  countryName?: string | undefined
  hostname?: string | undefined
}
