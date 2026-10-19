import type { TriageWindowInput } from './TriageWindowInput'

/** The resolved date filter, the admin API key (empty for viewers) and the
 * trend chart's own range, null to follow the page's window. */
export type TriageOverviewDataProps = {
  readonly input: TriageWindowInput
  readonly apiKey: string
  readonly trendDays: number | null
}
