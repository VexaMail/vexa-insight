import { cn } from '@/lib/utils'
import type { EmptyStateProps } from './EmptyStateProps'

export function EmptyState({ children, className }: Readonly<EmptyStateProps>) {
  return (
    <div
      className={cn(
        'border-border bg-card text-muted-foreground rounded-lg border p-8 text-center text-sm',
        className,
      )}
    >
      {children}
    </div>
  )
}
