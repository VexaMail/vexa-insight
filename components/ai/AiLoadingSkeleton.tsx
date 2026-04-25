'use client'

export default function AiLoadingSkeleton() {
  return (
    <div className="space-y-3">
      <div className="h-4 w-2/3 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
      <div className="h-4 w-full animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
      <div className="h-4 w-5/6 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
      <div className="h-4 w-3/4 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
      <div className="h-4 w-1/2 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
      <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
        Analyzing report data... This usually takes a few seconds.
      </p>
    </div>
  )
}
