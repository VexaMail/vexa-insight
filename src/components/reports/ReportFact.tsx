import { STATUS_TONE_TEXT_CLASSES } from '@/constants/ui'
import { cn } from '@/lib/utils'
import type { ReportFactProps } from '@/types/reports'

/** One labelled fact of the report strip, its icon tinted by its state. */
export function ReportFact({
  icon,
  label,
  tone = 'neutral',
  children,
}: Readonly<ReportFactProps>) {
  return (
    <div className="bg-card flex min-w-0 items-center gap-3 px-4 py-3">
      <span
        aria-hidden
        className={cn(
          'shrink-0 [&_svg]:h-5 [&_svg]:w-5',
          tone === 'neutral'
            ? 'text-muted-foreground'
            : STATUS_TONE_TEXT_CLASSES[tone],
        )}
      >
        {icon}
      </span>
      <div className="min-w-0">
        <dt className="text-muted-foreground truncate text-xs">{label}</dt>
        <dd className="text-foreground mt-0.5 text-sm font-medium break-words tabular-nums">
          {children}
        </dd>
      </div>
    </div>
  )
}
