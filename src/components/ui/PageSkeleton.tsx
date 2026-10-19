import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import type { PageSkeletonProps } from './PageSkeletonProps'

export function PageSkeleton({ className }: Readonly<PageSkeletonProps>) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'border-border bg-card flex h-32 w-full items-center justify-center rounded-lg border',
        className,
      )}
    >
      <Loader2 className="text-primary h-6 w-6 animate-spin" aria-hidden />
      <span className="sr-only">Loading…</span>
    </div>
  )
}
