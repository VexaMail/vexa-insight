import type { InsightToneBadgeProps } from './InsightToneBadgeProps'
import { TONE_LABELS } from './toneLabels'
import { TONE_STYLES } from './toneStyles'

export function InsightToneBadge({ tone }: Readonly<InsightToneBadgeProps>) {
  return (
    <span
      className={`rounded-full border px-2 py-0.5 text-xs font-medium ${TONE_STYLES[tone]}`}
    >
      {TONE_LABELS[tone]}
    </span>
  )
}
