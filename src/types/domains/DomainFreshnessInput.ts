import type { DomainHealthInput } from './DomainHealthInput'

/** A domain's status band inputs plus the last UTC day it had report data. */
export type DomainFreshnessInput = DomainHealthInput & {
  readonly lastReportDay?: number | null
}
