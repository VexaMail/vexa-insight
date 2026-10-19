import { STATUS_TONE_TEXT_CLASSES } from '@/constants/ui'
import { cn } from '@/lib/utils'
import type { ComplianceRingProps } from './ComplianceRingProps'

/** Pass rate as a ring with the figure in the middle. */
export function ComplianceRing({ rate, tone }: Readonly<ComplianceRingProps>) {
  const radius = 52
  const circumference = 2 * Math.PI * radius
  const filled = ((rate ?? 0) / 100) * circumference
  return (
    <div className="relative mx-auto h-32 w-32">
      <svg
        viewBox="0 0 120 120"
        className="h-full w-full -rotate-90"
        aria-hidden
      >
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          strokeWidth="10"
          className="stroke-secondary"
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          strokeWidth="10"
          strokeLinecap="round"
          stroke="currentColor"
          strokeDasharray={`${String(filled)} ${String(circumference)}`}
          className={STATUS_TONE_TEXT_CLASSES[tone]}
        />
      </svg>
      <span
        className={cn(
          'absolute inset-0 flex items-center justify-center font-mono text-2xl font-semibold tabular-nums',
          STATUS_TONE_TEXT_CLASSES[tone],
        )}
      >
        {rate === null ? 'n/a' : `${rate.toFixed(1)}%`}
      </span>
    </div>
  )
}
