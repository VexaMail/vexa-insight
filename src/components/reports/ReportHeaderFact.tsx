import type { ReportHeaderFactProps } from '@/types/reports'

/** One short fact of the report header, its icon and an accessible label. */
export function ReportHeaderFact({
  icon,
  label,
  children,
}: Readonly<ReportHeaderFactProps>) {
  return (
    <span className="text-muted-foreground inline-flex h-6 min-w-0 items-center gap-1.5 text-sm">
      <span aria-hidden className="shrink-0 [&_svg]:h-4 [&_svg]:w-4">
        {icon}
      </span>
      <span className="sr-only">{label}:</span>
      <span className="text-foreground truncate">{children}</span>
    </span>
  )
}
