import { SPARKLINE_TONE_CLASSES } from '@/constants/ui'
import { cn } from '@/lib/utils'
import type { SparklineProps } from '@/types/ui'
import { SparklineBars } from './SparklineBars'
import { SparklineLine } from './SparklineLine'

/** A tiny trend with no axes, sized by its container. */
export function Sparkline({
  values,
  kind = 'line',
  tone = 'neutral',
  className,
  label,
}: Readonly<SparklineProps>) {
  if (values.length < 2) return null
  const max = Math.max(...values, 1)
  return (
    <svg
      viewBox="0 0 100 32"
      preserveAspectRatio="none"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cn('h-8 w-24', SPARKLINE_TONE_CLASSES[tone], className)}
    >
      {kind === 'bars' ? (
        <SparklineBars values={values} max={max} />
      ) : (
        <SparklineLine values={values} max={max} />
      )}
    </svg>
  )
}
