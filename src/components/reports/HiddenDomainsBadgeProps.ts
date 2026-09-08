import type { ReportRow } from './ReportRow'

export type HiddenDomainsBadgeProps = {
  readonly domains: NonNullable<ReportRow['relatedDomains']>
}
