import { Button } from '@/components/ui'
import { ChevronDown, ChevronRight, Mail } from 'lucide-react'
import type { ImapAccountRowHeaderProps } from './ImapAccountRowHeaderProps'

/**
 * Collapsed header. A real button rather than a `role="button"` div, which
 * also gets Enter/Space for free. The Edit/Close affordance only toggles this
 * same panel, so it is rendered as a styled span: a real button nested inside
 * another control is axe `nested-interactive` (serious, wcag2a) and is not
 * reliably announced. `asChild` keeps the visual identical.
 */
export function ImapAccountRowHeader({
  displayLabel,
  index,
  isExpanded,
  onToggleExpand,
}: Readonly<ImapAccountRowHeaderProps>) {
  return (
    <button
      type="button"
      onClick={() => {
        onToggleExpand(index)
      }}
      aria-expanded={isExpanded}
      className="hover:bg-accent/50 focus-visible:ring-ring flex w-full cursor-pointer items-center justify-between gap-2 px-4 py-3 text-left transition-colors focus-visible:ring-1 focus-visible:outline-none"
    >
      <span className="flex items-center gap-2">
        {isExpanded ? (
          <ChevronDown className="text-muted-foreground h-4 w-4" />
        ) : (
          <ChevronRight className="text-muted-foreground h-4 w-4" />
        )}
        <Mail className="text-muted-foreground h-3.5 w-3.5" />
        <span className="text-foreground text-sm font-medium">
          {displayLabel}
        </span>
      </span>
      <span className="flex items-center gap-2">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="text-primary h-7 text-xs"
        >
          <span>{isExpanded ? 'Close' : 'Edit'}</span>
        </Button>
      </span>
    </button>
  )
}
