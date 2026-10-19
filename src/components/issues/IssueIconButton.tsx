import { cn } from '@/lib/utils'
import { forwardRef } from 'react'
import type { IssueIconButtonProps } from './IssueIconButtonProps'

/** A small square icon button with its label as tooltip and accessible name. */
export const IssueIconButton = forwardRef<
  HTMLButtonElement,
  IssueIconButtonProps
>(function IssueIconButton({ label, className, children, ...props }, ref) {
  return (
    <button
      ref={ref}
      type="button"
      aria-label={label}
      title={label}
      className={cn(
        'border-border text-muted-foreground hover:bg-accent hover:text-foreground focus-visible:ring-ring active:bg-accent/80 inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border transition-colors focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:h-3.5 [&_svg]:w-3.5',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
})
