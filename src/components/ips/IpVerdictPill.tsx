import { StatusPill } from '@/components/ui'
import { IP_VERDICT_ICONS } from '@/constants/ips'
import type { IpVerdictPillProps } from '@/types/ips'

/** A rate verdict (Pass, Fail, Partial) as a filled pill led by its mark. */
export function IpVerdictPill({
  verdict,
  className,
}: Readonly<IpVerdictPillProps>) {
  const Icon = IP_VERDICT_ICONS[verdict.tone]
  return (
    <StatusPill
      tone={verdict.tone}
      variant="solid"
      icon={<Icon />}
      className={className ?? ''}
    >
      {verdict.label}
    </StatusPill>
  )
}
