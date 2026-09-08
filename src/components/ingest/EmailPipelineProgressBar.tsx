'use client'

import type { EmailPipelineProgressBarProps } from '@/types/ingest'

export function EmailPipelineProgressBar({
  percent,
  label,
  barColor,
  isActive,
}: EmailPipelineProgressBarProps) {
  return (
    <div className="mt-4">
      <div className="text-muted-foreground mb-1 flex items-center justify-between text-xs">
        <span>{label}</span>
        <span className="text-foreground font-semibold">{percent}%</span>
      </div>
      <div
        className="bg-surface-2 h-2 w-full overflow-hidden rounded-full"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <div
          className={`h-full rounded-full transition-all duration-500 ${barColor} ${isActive ? 'animate-pulse' : ''}`}
          style={{ width: `${String(percent)}%` }}
        />
      </div>
    </div>
  )
}
