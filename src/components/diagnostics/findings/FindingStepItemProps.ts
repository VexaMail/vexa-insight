import type { FindingStep } from '@/types/diagnostics'

export type FindingStepItemProps = {
  readonly step: FindingStep
  /** Position in the flow, from 0. */
  readonly index: number
}
