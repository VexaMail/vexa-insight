import { EmptyState } from '@/components/ui'

/** The sources table when no source matches the window or filter. */
export function IpsTableEmpty() {
  return (
    <EmptyState>
      <p className="text-foreground font-medium">No sending sources</p>
      <p className="mt-1">
        No source sent mail for your domains in this window, or none matches the
        selected cause. Widen the date range or clear the filter.
      </p>
    </EmptyState>
  )
}
