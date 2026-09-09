'use client'

import { ChevronDown } from 'lucide-react'
import type { CollapsibleSectionToggleProps } from './CollapsibleSectionToggleProps'

export function CollapsibleSectionToggle({
  bodyId,
  open,
  onToggle,
}: Readonly<CollapsibleSectionToggleProps>) {
  return (
    <button
      type="button"
      aria-expanded={open}
      aria-controls={bodyId}
      onClick={onToggle}
      className="text-muted-foreground hover:text-foreground hover:bg-muted focus-visible:ring-ring inline-flex cursor-pointer items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none print:hidden"
    >
      {open ? 'Hide details' : 'Show details'}
      <ChevronDown
        aria-hidden="true"
        className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`}
      />
    </button>
  )
}
