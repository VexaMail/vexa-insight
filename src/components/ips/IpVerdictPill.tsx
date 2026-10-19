import { StatusPill } from '@/components/ui'
import { IP_VERDICT_ICONS } from '@/constants/ips'
import type { IpVerdictPillProps } from '@/types/ips'

/** A rate verdict (Pass, Fail, Partial) as a pill led by a check or a cross. */
export function IpVerdictPill({
  verdict,
  className,
}: Readonly<IpVerdictPillProps>) {
  const Icon = IP_VERDICT_ICONS[verdict.tone]
  return (
    <StatusPill tone={verdict.tone} icon={<Icon />} className={className ?? ''}>
      {verdict.label}
    </StatusPill>
  )
}
