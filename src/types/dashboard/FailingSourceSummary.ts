/** A sending IP across every domain it reported for in the current period. */
export type FailingSourceSummary = {
  ip: string
  countryCode: string | null
  /** The domain with the most failing messages from this IP. */
  exampleDomain: string
  domainCount: number
  total: number
  failed: number
}
