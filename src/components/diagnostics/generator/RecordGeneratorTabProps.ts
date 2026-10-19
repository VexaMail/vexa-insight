import type { RecordGeneratorInput } from '@/types/diagnostics'

export type RecordGeneratorTabProps = RecordGeneratorInput & {
  /** Database id of the domain, for the SPF lookup planner. */
  readonly domainId: number
}
