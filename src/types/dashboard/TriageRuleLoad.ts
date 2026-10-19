import type { TriageRuleInput } from './TriageRuleInput'

/** The rule inputs for one window and the domain ids they were scoped to. */
export type TriageRuleLoad = {
  rules: TriageRuleInput
  allowedIds: number[] | null
}
