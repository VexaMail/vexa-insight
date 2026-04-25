import type { SpfCheckResult } from './SpfCheckResult'

export type SpfValidationCategory = {
  category: string
  checks: SpfCheckResult[]
}
