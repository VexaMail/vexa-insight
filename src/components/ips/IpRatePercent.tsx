'use client'

import { getRateColorClass } from '@/utils/ips'
import type { IpRatePercentProps } from './IpRatePercentProps'

export function IpRatePercent({ rate }: IpRatePercentProps) {
  return (
    <span
      className={`text-sm font-medium tabular-nums ${getRateColorClass(rate)}`}
    >
      {rate.toFixed(1)}%
    </span>
  )
}
