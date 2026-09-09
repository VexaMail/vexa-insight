import { Skeleton } from '@/components/ui'
import { RANKED_LIST_SKELETON_ROWS } from '@/constants/dashboard'

export function LatestReportsSkeleton() {
  return (
    <div className="space-y-3">
      {RANKED_LIST_SKELETON_ROWS.map((row) => (
        <div key={row} className="flex flex-col gap-2 p-3">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      ))}
    </div>
  )
}
