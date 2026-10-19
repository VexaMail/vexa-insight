import { StatusPill } from '@/components/ui'
import { ISSUE_SEVERITY_TONES } from '@/constants/dashboard'
import { severityPillVariant } from '@/utils/ui'
import type { IssueSeverityPillProps } from './IssueSeverityPillProps'

/** Critical, Warning or Info as a badge of one width, so rows align. */
export function IssueSeverityPill({
  severity,
}: Readonly<IssueSeverityPillProps>) {
  const { tone, label } = ISSUE_SEVERITY_TONES[severity]
  return (
    <StatusPill
      tone={tone}
      variant={severityPillVariant(tone)}
      className="w-[72px] justify-center"
    >
      {label}
    </StatusPill>
  )
}
