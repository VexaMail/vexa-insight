import type { FailureReason } from './FailureReason'

/** Who sends as a domain and why its failing mail fails. */
export type DomainInsights = {
  readonly uniqueSources: number
  readonly countries: number
  readonly failingSources: number
  readonly forwardedSources: number
  readonly failingMessages: number
  /** Reasons overlap: one failing message usually has an SPF and a DKIM reason. */
  readonly reasons: readonly FailureReason[]
}
