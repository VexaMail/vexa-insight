import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import type { LoadingPanelProps } from './LoadingPanelProps'

/** A spinner with a line saying what the page is waiting for. */
export function LoadingPanel({
  children,
  className,
}: Readonly<LoadingPanelProps>) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'border-border bg-card text-muted-foreground flex min-h-48 flex-col items-center justify-center gap-3 rounded-lg border p-8 text-center text-sm',
        className,
      )}
    >
      <Loader2 className="text-primary h-6 w-6 animate-spin" aria-hidden />
      <p>{children}</p>
    </div>
  )
}
