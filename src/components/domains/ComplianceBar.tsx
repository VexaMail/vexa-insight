'use client'

import { cn } from '@/lib/utils'
import type { ComplianceBarProps } from './ComplianceBarProps'
import { getComplianceStyles } from './getComplianceStyles'

export function ComplianceBar({ passRate, muted = false }: ComplianceBarProps) {
  const { textColor, barColor } = getComplianceStyles(passRate)

  return (
    <div className="flex min-w-[140px] items-center gap-3">
      <div className="bg-secondary h-1.5 flex-1 overflow-hidden rounded-full">
        <div
          className={cn(
            'h-full rounded-full',
            muted ? 'bg-unknown/60' : barColor,
          )}
          style={{ width: `${String(passRate)}%` }}
        />
      </div>
      <span
        className={cn(
          'w-14 text-right font-mono text-xs font-semibold tabular-nums',
          muted ? 'text-muted-foreground' : textColor,
        )}
      >
        {passRate.toFixed(1)}%
      </span>
    </div>
  )
}
