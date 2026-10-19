import type { TriageWindowInput } from './TriageWindowInput'

/** The resolved date filter and the admin API key (empty for viewers). */
export type TriageOverviewDataProps = {
  readonly input: TriageWindowInput
  readonly apiKey: string
}
