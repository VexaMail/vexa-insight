import { StatusPill } from '@/components/ui'
import type { SeverityPillProps } from './SeverityPillProps'

/** Critical, Warning or Info, on the console's status tones. */
export function SeverityPill({ severity }: Readonly<SeverityPillProps>) {
  if (severity === 'critical') {
    return (
      <StatusPill tone="danger" dot>
        Critical
      </StatusPill>
    )
  }
  if (severity === 'warning') {
    return (
      <StatusPill tone="warning" dot>
        Warning
      </StatusPill>
    )
  }
  return (
    <StatusPill tone="info" dot>
      Info
    </StatusPill>
  )
}
