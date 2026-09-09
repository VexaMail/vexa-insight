import { Skeleton } from '@/components/ui'

export function PassRateRingSkeleton() {
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
