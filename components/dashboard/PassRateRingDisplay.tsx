'use client'

import { Skeleton } from '@/components/ui'
import { usePassRateRingDisplay } from '@/hooks/dashboard'

export default function PassRateRingDisplay({
  rate,
  isLoading = false,
}: Readonly<{ rate: number; isLoading?: boolean }>) {
  const displayRate = usePassRateRingDisplay(rate)

  const circumference = 2 * Math.PI * 54
  const strokeDashoffset = circumference - (displayRate / 100) * circumference

  if (isLoading) {
    return (
      <div className="glass-card-hover relative flex items-center gap-5 overflow-hidden p-5">
        <Skeleton className="h-32 w-32 shrink-0 rounded-full" />
        <div className="space-y-3">
          <Skeleton className="h-3 w-28" />
          <Skeleton className="h-4 w-40" />
          <div className="mt-3 flex gap-3">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="glass-card-hover relative flex items-center gap-5 overflow-hidden p-5">
      <div className="relative h-32 w-32 shrink-0">
        <svg className="h-32 w-32 -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="hsl(var(--danger))"
            strokeWidth="8"
          />
          <circle
            className="transition-[stroke-dashoffset] duration-75 ease-out"
            cx="60"
            cy="60"
            r="54"
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
      <div className="space-y-1.5">
        <p className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
          Global Pass Rate
        </p>
        <p className="text-muted-foreground text-sm">
          DMARC compliance across all domains
        </p>
        <div className="mt-3 flex gap-3">
          <div className="flex items-center gap-1.5">
            <div className="bg-success h-2 w-2 rounded-full" />
            <span className="text-muted-foreground text-xs">Pass {rate}%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="bg-danger h-2 w-2 rounded-full" />
            <span className="text-muted-foreground text-xs">
              Fail {100 - rate}%
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
