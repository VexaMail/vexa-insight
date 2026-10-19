import { cn } from '@/lib/utils'
import { forwardRef } from 'react'
import type { IssueIconButtonProps } from './IssueIconButtonProps'

/**
 * An issue action. While the row is stacked (a phone) it is a 44px button
 * with its icon and one word; once the row has columns it shrinks to a 32px
 * icon square with the full label as tooltip. The label is always its
 * accessible name.
 */
export const IssueIconButton = forwardRef<
  HTMLButtonElement,
  IssueIconButtonProps
>(function IssueIconButton(
  { label, shortLabel, className, children, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      aria-label={label}
      title={label}
      className={cn(
        'border-border text-muted-foreground hover:bg-accent hover:text-foreground focus-visible:ring-ring active:bg-accent/80 inline-flex h-11 min-w-11 cursor-pointer items-center justify-center gap-1.5 rounded-md border px-3 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 @xl:h-8 @xl:w-8 @xl:min-w-0 @xl:px-0 [&_svg]:h-4 [&_svg]:w-4 @xl:[&_svg]:h-3.5 @xl:[&_svg]:w-3.5',
        className,
      )}
      {...props}
    >
      {children}
      {shortLabel ? (
        <span aria-hidden className="@xl:hidden">
          {shortLabel}
        </span>
      ) : null}
    </button>
  )
})
