import type { ActionSeverity } from './ActionSeverity'

/** One row of the "Action required" queue, derived from existing data. */
export type ActionItem = {
  /** The issue key, `<kind>:<domain>[:<detail>]`, operator actions use. */
  id: string
  severity: ActionSeverity
  /** Domain, IP address or subsystem the item is about. */
  subject: string
  issue: string
  detail: string
  /** Messages affected in the current period; null when not message-based. */
  impactMessages: number | null
  /** Share of the period's messages failing DMARC; null when not message-based. */
  impactRate: number | null
  /** Unix seconds of the newest evidence; null when there is none. */
  lastSeenAt: number | null
  /** True when it appeared or got worse in the current period. */
  isNew: boolean
  /** Page that explains the item. */
  href: string
}
