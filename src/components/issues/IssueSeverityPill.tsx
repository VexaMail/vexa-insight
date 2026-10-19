import { StatusPill } from '@/components/ui'
import { CircleAlert, Info, TriangleAlert } from 'lucide-react'
import type { IssueSeverityPillProps } from './IssueSeverityPillProps'

/** Critical, Warning or Info, each with its own icon and status tone. */
export function IssueSeverityPill({
  severity,
}: Readonly<IssueSeverityPillProps>) {
  if (severity === 'critical') {
    return (
      <StatusPill tone="danger" icon={<CircleAlert />}>
        Critical
      </StatusPill>
    )
  }
  if (severity === 'warning') {
    return (
      <StatusPill tone="warning" icon={<TriangleAlert />}>
        Warning
      </StatusPill>
    )
  }
  return (
    <StatusPill tone="info" icon={<Info />}>
      Info
    </StatusPill>
  )
}
