import { cn } from '@/lib/utils'
import type { ReportMetadataItemProps } from '@/types/reports'

/** One labelled fact of the report metadata list. */
export function ReportMetadataItem({
  label,
  children,
  mono = false,
}: Readonly<ReportMetadataItemProps>) {
  return (
    <div className="min-w-0">
      <dt className="text-muted-foreground font-mono text-[11px] tracking-[0.16em] uppercase">
        {label}
      </dt>
      <dd
        className={cn(
          'text-foreground mt-1 text-sm break-words',
          mono && 'font-mono text-xs',
        )}
      >
        {children}
      </dd>
    </div>
  )
}
