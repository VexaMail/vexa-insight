/**
 * One sending source in the demo estate, with the behaviour that makes it
 * recognisable: an own mail server authenticates on both identifiers, a
 * newsletter tool signs nothing, a forwarder breaks SPF and keeps DKIM, and a
 * source nobody authorised passes neither.
 */
export type DemoSource = {
  readonly ip: string
  /** Probability that SPF passes for a message from this source. */
  readonly spfPassRate: number
  /** Probability that DKIM passes for a message from this source. */
  readonly dkimPassRate: number
  /** Probability that a passing identifier is also aligned with the domain. */
  readonly alignmentRate: number
  /** Scales this source's message counts, so volume matches its role. */
  readonly volumeWeight: number
}
