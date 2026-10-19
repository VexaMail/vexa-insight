import type { DiagnosticsProtocolState } from './DiagnosticsProtocolState'
import type { DomainScore } from './DomainScore'

/** The stored outcome of one domain's last DNS run, as the index shows it. */
export type DiagnosticsOverviewCheck = {
  /** ISO timestamp of the DNS run. */
  readonly checkedAt: string
  /** False when the NS lookup returned nothing: the run says little. */
  readonly resolved: boolean
  readonly grade: DomainScore['grade']
  readonly percentage: number
  readonly protocols: readonly DiagnosticsProtocolState[]
}
