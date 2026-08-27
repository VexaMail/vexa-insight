/**
 * Sending source row scoped to a single raw report.
 * Enriched with DKIM and policy override data for future Phase 2 use.
 */
export type ReportSource = {
  ip: string
  hostname: string | null
  countryCode: string | null
  messageCount: number
  spfResult: string
  dkimResult: string
  spfAligned: boolean
  dkimAligned: boolean
  disposition: string
  /** Policy override types applied to events from this source (e.g. "forwarded"). Empty if none. */
  overrideTypes: string[]
  /** Primary DKIM signing domain from auth results, if available. */
  primaryDkimDomain: string | null
  /** Primary DKIM selector from auth results, if available. */
  primaryDkimSelector: string | null
}
