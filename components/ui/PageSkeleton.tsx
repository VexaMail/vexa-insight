import { cn } from '@/lib/utils'
import type { PageSkeletonProps } from './PageSkeletonProps'

export function PageSkeleton({ className }: Readonly<PageSkeletonProps>) {
  return (
    <div
      className={cn(
        'border-border bg-muted/30 h-32 w-full animate-pulse rounded-lg border',
        className,
      )}
    />
  )
}
