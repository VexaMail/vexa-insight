import type { DnsDiagnostics } from './DnsDiagnostics'

/** What the findings are derived from: the DNS run and when it ran. */
export type DiagnosticsFindingsInput = {
  readonly dns: DnsDiagnostics
  /** ISO timestamp of the run; dates the suggested MTA-STS policy id. */
  readonly checkedAt: string
}
