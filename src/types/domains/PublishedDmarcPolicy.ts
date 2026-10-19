/**
 * The DMARC policy a domain published, as the receiver quoted it in the
 * `policy_published` block of the latest aggregate report it sent.
 */
export type PublishedDmarcPolicy = {
  /** `p=`: none, quarantine or reject; null when the report left it out. */
  readonly policy: string | null
  /** `sp=`, the policy for subdomains. */
  readonly subdomainPolicy: string | null
  /** `pct=`, the share of failing mail the policy applies to. */
  readonly pct: number | null
  /** `adkim=` and `aspf=`: `r` relaxed or `s` strict alignment. */
  readonly adkim: string | null
  readonly aspf: string | null
  /** End of the report the policy was read from, unix seconds. */
  readonly reportedAt: number
  readonly reporter: string
}
