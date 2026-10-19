/** The newest aggregate report of a domain and a slice of its XML. */
export type LatestDomainReport = {
  readonly domainId: number
  readonly endDate: number
  readonly orgName: string
  /** The XML from `<policy_published>` on, a few hundred characters. */
  readonly snippet: string
}
