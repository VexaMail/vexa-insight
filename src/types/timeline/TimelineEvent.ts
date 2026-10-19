/** Something that happened to a domain, placed on its health timeline. */
export type TimelineEvent = {
  /** Unix seconds. */
  readonly at: number
  readonly kind: 'dns_change' | 'new_source' | 'source_review' | 'issue_action'
  /** One line for the operator, e.g. `SPF record changed`. */
  readonly title: string
  /** The record value, IP or note behind it. */
  readonly detail: string | null
  /** Where the evidence lives, e.g. `/ips/192.0.2.10`. */
  readonly href: string | null
}
