import type { DnsDiagnostics } from './DnsDiagnostics'

/** What the record generator pre-fills its forms from. */
export type RecordGeneratorInput = {
  readonly dns: DnsDiagnostics
  /** ISO timestamp of the run; dates the suggested MTA-STS policy id. */
  readonly checkedAt: string
}
