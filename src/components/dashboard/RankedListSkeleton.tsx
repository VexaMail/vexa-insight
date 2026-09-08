import { Skeleton } from '@/components/ui'
import { RANKED_LIST_SKELETON_ROWS } from '@/constants/dashboard'

/** Placeholder rows shown while a ranked list is loading. */
export function RankedListSkeleton() {
  return (
    <div className="space-y-3">
      {RANKED_LIST_SKELETON_ROWS.map((row) => (
        <div key={row} className="space-y-2 p-3">
          <div className="flex justify-between">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-1/4" />
          </div>
          <Skeleton className="bg-secondary h-1.5 w-full rounded-full" />
        </div>
      ))}
    </div>
  )
}
