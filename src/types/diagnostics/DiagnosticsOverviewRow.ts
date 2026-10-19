import type { DiagnosticsOverviewCheck } from './DiagnosticsOverviewCheck'

/** One domain of the diagnostics index and its last DNS run, if any. */
export type DiagnosticsOverviewRow = {
  readonly domainId: number
  readonly domainName: string
  /** Null until the domain's DNS has been checked once. */
  readonly check: DiagnosticsOverviewCheck | null
}
