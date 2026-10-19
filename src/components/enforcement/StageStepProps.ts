import type { EnforcementStage } from '@/types/domains'

export type StageStepProps = {
  readonly stage: EnforcementStage
  readonly index: number
}
