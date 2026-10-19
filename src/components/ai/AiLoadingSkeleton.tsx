'use client'

export default function AiLoadingSkeleton() {
  return (
    <div className="space-y-3">
      <div className="bg-muted h-4 w-2/3 animate-pulse rounded" />
      <div className="bg-muted h-4 w-full animate-pulse rounded" />
      <div className="bg-muted h-4 w-5/6 animate-pulse rounded" />
      <div className="bg-muted h-4 w-3/4 animate-pulse rounded" />
      <div className="bg-muted h-4 w-1/2 animate-pulse rounded" />
      <p className="text-muted-foreground mt-2 text-sm">
        Analyzing report data... This usually takes a few seconds.
      </p>
    </div>
  )
}
