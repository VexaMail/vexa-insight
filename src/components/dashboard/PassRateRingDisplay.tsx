'use client'

import { usePassRateRingDisplay } from '@/hooks/dashboard'
import { PassRateLegend } from './PassRateLegend'
import type { PassRateRingDisplayProps } from './PassRateRingDisplayProps'
import { PassRateRingGauge } from './PassRateRingGauge'
import { PassRateRingSkeleton } from './PassRateRingSkeleton'

export default function PassRateRingDisplay({
  rate,
  isLoading = false,
}: Readonly<PassRateRingDisplayProps>) {
  const displayRate = usePassRateRingDisplay(rate)

  if (isLoading) return <PassRateRingSkeleton />

  return (
    <div className="glass-card-hover relative flex items-center gap-5 overflow-hidden p-5">
      <PassRateRingGauge displayRate={displayRate} />
      <PassRateLegend rate={rate} />
    </div>
  )
}
