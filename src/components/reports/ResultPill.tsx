import { StatusPill } from '@/components/ui'
import { OUTCOME_TONE_ICONS } from '@/constants/reports'
import type { ResultPillProps } from '@/types/reports'
import { verdictPillVariant } from '@/utils/ui'

/** A state pill led by the icon of its tone: check, cross, warning. */
export function ResultPill({
  tone,
  children,
  title,
}: Readonly<ResultPillProps>) {
  const Icon = OUTCOME_TONE_ICONS[tone]
  return (
    <StatusPill
      tone={tone}
      variant={verdictPillVariant(tone)}
      icon={<Icon />}
      {...(title ? { title } : {})}
    >
      {children}
    </StatusPill>
  )
}
