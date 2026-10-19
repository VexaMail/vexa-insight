import type { ComplianceWindow } from './ComplianceWindow'

/** The last `days` of reports against the `days` before them. */
export type ComplianceTrend = {
  readonly days: number
  readonly current: ComplianceWindow
  readonly previous: ComplianceWindow
}
