import { cn } from '@/lib/utils'
import type { InlineErrorBlockProps } from './InlineErrorBlockProps'

export function InlineErrorBlock({
  children,
  className,
}: Readonly<InlineErrorBlockProps>) {
  return (
    <div
      className={cn(
        'border-destructive/30 bg-destructive/5 text-destructive rounded-lg border p-4 text-sm',
        className,
      )}
    >
      {children}
    </div>
  )
}
