import type { SpfPlan } from './SpfPlan'

export type UseSpfPlanReturn = {
  readonly plan: SpfPlan | null
  readonly error: string | null
  readonly pending: boolean
  /** Counts the lookups of `record` against the published one. */
  readonly run: (record: string) => void
}
