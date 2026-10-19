import type { EnforcementStageKey } from './EnforcementStageKey'

/** One step of the enforcement guide and where the domain stands on it. */
export type EnforcementStage = {
  readonly key: EnforcementStageKey
  readonly label: string
  readonly hint: string
  readonly state: 'done' | 'current' | 'todo'
}
