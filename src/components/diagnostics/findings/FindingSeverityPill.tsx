import { StatusPill } from '@/components/ui'
import {
  findingSeverityLabels,
  findingSeverityTones,
} from '@/constants/diagnostics'
import { severityPillVariant } from '@/utils/ui'
import type { FindingSeverityProps } from './FindingSeverityProps'

/** A finding's severity badge: filled when it asks for action. */
export function FindingSeverityPill({
  severity,
}: Readonly<FindingSeverityProps>) {
  const tone = findingSeverityTones[severity]
  return (
    <StatusPill
      tone={tone}
      variant={severityPillVariant(tone)}
      className="h-7 min-w-[4.5rem] justify-center px-2.5"
    >
      {findingSeverityLabels[severity]}
    </StatusPill>
  )
}
