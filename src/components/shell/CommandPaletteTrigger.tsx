import * as DialogPrimitive from '@radix-ui/react-dialog'
import { Search } from 'lucide-react'

/** The top bar field that opens the command palette. */
export function CommandPaletteTrigger() {
  return (
    <DialogPrimitive.Trigger asChild>
      <button
        type="button"
        className="border-border bg-secondary/60 text-muted-foreground hover:border-primary/40 hover:text-foreground focus-visible:ring-ring flex h-10 min-w-10 items-center justify-center gap-2 rounded-md border px-2.5 text-sm transition-colors duration-150 focus-visible:ring-2 focus-visible:outline-none md:w-full md:max-w-xl md:justify-start lg:h-11"
        aria-label="Search domains, IPs and reports"
      >
        <Search className="h-4 w-4 shrink-0" />
        <span className="hidden truncate md:inline">
          Search domains, IPs, reports or diagnostics…
        </span>
        <kbd className="border-border bg-background ml-auto hidden rounded border px-1.5 font-mono text-[11px] md:inline">
          ⌘K
        </kbd>
      </button>
    </DialogPrimitive.Trigger>
  )
}
