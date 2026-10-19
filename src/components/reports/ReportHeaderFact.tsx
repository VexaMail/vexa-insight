import type { ReportHeaderFactProps } from '@/types/reports'

/** One short fact of the report header, its icon and an accessible label. */
export function ReportHeaderFact({
  icon,
  label,
  children,
}: Readonly<ReportHeaderFactProps>) {
  return (
    <span className="border-border bg-secondary/40 text-muted-foreground inline-flex h-7 min-w-0 items-center gap-1.5 rounded-md border px-2 text-xs">
      <span aria-hidden className="shrink-0 [&_svg]:h-3.5 [&_svg]:w-3.5">
        {icon}
      </span>
      <span className="sr-only">{label}:</span>
      <span className="text-foreground truncate">{children}</span>
    </span>
  )
}
