import { Skeleton } from '@/components/ui'

/** Placeholder blocks in the overview's layout while its data streams in. */
export function TriageOverviewSkeleton() {
  return (
    <div
      aria-busy="true"
      aria-label="Loading overview"
      className="flex flex-col gap-4"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Skeleton className="h-28 rounded-xl" />
        <Skeleton className="h-28 rounded-xl" />
        <Skeleton className="h-28 rounded-xl" />
        <Skeleton className="h-28 rounded-xl" />
      </div>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
        <Skeleton className="h-96 rounded-xl xl:col-span-7" />
        <Skeleton className="h-96 rounded-xl xl:col-span-5" />
      </div>
    </div>
  )
}
