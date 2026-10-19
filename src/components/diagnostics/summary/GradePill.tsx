import { StatusPill } from '@/components/ui'
import { gradeLabels } from '@/constants/diagnostics'
import { scoreGradeTone } from '@/utils/diagnostics'
import { verdictPillVariant } from '@/utils/ui'
import { gradeIcons } from './gradeIcons'
import type { GradePillProps } from './GradePillProps'

/** Poor, Fair, Good or Excellent, with the letter grade in its title. */
export function GradePill({ grade }: Readonly<GradePillProps>) {
  const Icon = gradeIcons[grade]
  const tone = scoreGradeTone(grade)
  return (
    <StatusPill
      tone={tone}
      variant={verdictPillVariant(tone)}
      icon={<Icon />}
      title={`Grade ${grade}`}
    >
      {gradeLabels[grade]}
    </StatusPill>
  )
}
