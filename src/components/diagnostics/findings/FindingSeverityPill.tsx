import { StatusPill } from '@/components/ui'
import {
  findingSeverityLabels,
  findingSeverityTones,
} from '@/constants/diagnostics'
import type { FindingSeverityProps } from './FindingSeverityProps'

export function FindingSeverityPill({
  severity,
}: Readonly<FindingSeverityProps>) {
  return (
    <StatusPill tone={findingSeverityTones[severity]} dot>
      {findingSeverityLabels[severity]}
    </StatusPill>
  )
}
