import { STATUS_TONE_TEXT_CLASSES } from '@/constants/ui'
import { cn } from '@/lib/utils'
import { ArrowDownRight, ArrowRight, ArrowUpRight } from 'lucide-react'
import type { ComplianceDeltaProps } from './ComplianceDeltaProps'

/** Last window's pass rate against the window before it, in points. */
export function ComplianceDelta({ trend }: Readonly<ComplianceDeltaProps>) {
  const { current, previous, days } = trend
  const window = `${String(days)} days`
  if (current.rate === null || previous.rate === null) {
    return (
      <p className="text-muted-foreground text-xs">
        {current.rate === null
          ? `No mail in the last ${window}.`
          : `Last ${window}: ${current.rate.toFixed(1)}%; no mail in the ${window} before.`}
      </p>
    )
  }
  const delta = current.rate - previous.rate
  let tone: 'success' | 'danger' | 'neutral' = 'neutral'
  if (delta >= 0.1) tone = 'success'
  else if (delta <= -0.1) tone = 'danger'
  const Icon = {
    success: ArrowUpRight,
    danger: ArrowDownRight,
    neutral: ArrowRight,
  }[tone]
  return (
    <p className="text-muted-foreground text-xs">
      <span
        className={cn(
          'inline-flex items-center gap-0.5 font-mono font-semibold',
          STATUS_TONE_TEXT_CLASSES[tone],
        )}
      >
        <Icon className="h-3.5 w-3.5" aria-hidden />
        {delta > 0 ? '+' : ''}
        {delta.toFixed(1)} pts
      </span>{' '}
      last {window} ({current.rate.toFixed(1)}% of{' '}
      {current.total.toLocaleString('en-US')}) vs the {window} before (
      {previous.rate.toFixed(1)}%)
    </p>
  )
}
