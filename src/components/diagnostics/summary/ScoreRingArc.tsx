import { STATUS_TONE_TEXT_CLASSES } from '@/constants/ui'
import type { ScoreRingProps } from './ScoreRingProps'

/** The track and the filled arc of the score ring, starting at 12 o'clock. */
export function ScoreRingArc({
  percentage,
  tone,
  size = 'lg',
}: Readonly<ScoreRingProps>) {
  const circumference = 2 * Math.PI * 42
  const filled = (Math.max(0, Math.min(100, percentage)) / 100) * circumference
  const width = size === 'lg' ? 8 : 10
  return (
    <svg viewBox="0 0 100 100" aria-hidden className="h-full w-full -rotate-90">
      <circle
        cx="50"
        cy="50"
        r="42"
        fill="none"
        strokeWidth={width}
        className="stroke-muted"
      />
      <circle
        cx="50"
        cy="50"
        r="42"
        fill="none"
        stroke="currentColor"
        strokeWidth={width}
        strokeLinecap={filled > 0 ? 'round' : 'butt'}
        strokeDasharray={`${String(filled)} ${String(circumference)}`}
        className={STATUS_TONE_TEXT_CLASSES[tone]}
      />
    </svg>
  )
}
