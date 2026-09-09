import { PASS_RATE_RING_RADIUS } from '@/constants/dashboard'
import type { PassRateRingGaugeProps } from './PassRateRingGaugeProps'

/** The animated ring with the rate printed in its centre. */
export function PassRateRingGauge({
  displayRate,
}: Readonly<PassRateRingGaugeProps>) {
  const circumference = 2 * Math.PI * PASS_RATE_RING_RADIUS
  const strokeDashoffset = circumference - (displayRate / 100) * circumference

  return (
    <div className="relative h-32 w-32 shrink-0">
      <svg className="h-32 w-32 -rotate-90" viewBox="0 0 120 120">
        <circle
          cx="60"
          cy="60"
          r={PASS_RATE_RING_RADIUS}
          fill="none"
          stroke="hsl(var(--danger))"
          strokeWidth="8"
        />
        <circle
          className="transition-[stroke-dashoffset] duration-75 ease-out"
          cx="60"
          cy="60"
          r={PASS_RATE_RING_RADIUS}
          fill="none"
          stroke="hsl(var(--success))"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-display text-foreground text-2xl font-bold">
          {displayRate}%
        </span>
      </div>
    </div>
  )
}
