import { StatusPill } from '@/components/ui'
import {
  findingSeverityLabels,
  findingSeverityTones,
} from '@/constants/diagnostics'
import type { FindingSeverityProps } from './FindingSeverityProps'
import { findingSeverityIcons } from './findingSeverityIcons'

export function FindingSeverityPill({
  severity,
}: Readonly<FindingSeverityProps>) {
  const Icon = findingSeverityIcons[severity]
  return (
    <StatusPill
      tone={findingSeverityTones[severity]}
      icon={<Icon />}
      className="h-7 rounded-full px-2.5"
    >
      {findingSeverityLabels[severity]}
    </StatusPill>
  )
}
