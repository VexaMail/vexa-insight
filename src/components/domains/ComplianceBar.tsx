'use client'

import { cn } from '@/lib/utils'
import type { ComplianceBarProps } from './ComplianceBarProps'
import { getComplianceStyles } from './getComplianceStyles'

export function ComplianceBar({ passRate }: ComplianceBarProps) {
  const { textColor, barColor } = getComplianceStyles(passRate)

  return (
    <div className="flex min-w-[140px] items-center gap-3">
      <div className="bg-secondary h-1.5 flex-1 overflow-hidden rounded-full">
        <div
          className={cn('h-full rounded-full', barColor)}
          style={{ width: `${String(passRate)}%` }}
        />
      </div>
      <span className={cn('w-12 text-right text-xs font-semibold', textColor)}>
        {passRate.toFixed(1)}%
      </span>
    </div>
  )
}
