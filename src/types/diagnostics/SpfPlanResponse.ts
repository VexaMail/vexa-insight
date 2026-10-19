import type { SpfPlan } from './SpfPlan'
import type { SpfPlanError } from './SpfPlanError'

/** Body of `POST /api/v1/domains/{id}/dns/spf-plan`. */
export type SpfPlanResponse = {
  readonly data?: SpfPlan
  readonly error?: SpfPlanError
}
