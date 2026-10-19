import { StatusPill } from '@/components/ui'
import {
  findingSeverityLabels,
  findingSeverityTones,
} from '@/constants/diagnostics'
import type { FindingSeverityProps } from './FindingSeverityProps'

/** The filled severity badge of a finding or a runbook item. */
export function FindingSeverityPill({
  severity,
}: Readonly<FindingSeverityProps>) {
  return (
    <StatusPill
      tone={findingSeverityTones[severity]}
      variant="solid"
      className="h-7 min-w-[4.5rem] justify-center px-2.5"
    >
      {findingSeverityLabels[severity]}
    </StatusPill>
  )
}
