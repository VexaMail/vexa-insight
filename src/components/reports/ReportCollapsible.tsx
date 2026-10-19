import type { ReportCollapsibleProps } from '@/types/reports'
import { ChevronRight } from 'lucide-react'

/** A closed-by-default report section, on the console's card surface. */
export function ReportCollapsible({
  title,
  icon,
  actions,
  children,
  onToggle,
}: Readonly<ReportCollapsibleProps>) {
  return (
    <details className="glass-card group min-w-0" onToggle={onToggle}>
      <summary className="hover:bg-accent/50 flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 rounded-[inherit] px-4 py-2 transition-colors duration-150 select-none [&::-webkit-details-marker]:hidden">
        <span className="text-foreground flex min-w-0 items-center gap-2 text-sm font-semibold">
          <ChevronRight
            className="text-muted-foreground h-4 w-4 shrink-0 transition-transform duration-150 group-open:rotate-90"
            aria-hidden="true"
          />
          {icon ? (
            <span className="text-primary shrink-0 [&_svg]:h-4 [&_svg]:w-4">
              {icon}
            </span>
          ) : null}
          <span className="truncate">{title}</span>
        </span>
        {actions}
      </summary>
      <div className="border-border border-t p-4">{children}</div>
    </details>
  )
}
