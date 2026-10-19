import { cn } from '@/lib/utils'
import type { InsightRowProps } from './InsightRowProps'

/** One label and value line of the key insights card. */
export function InsightRow({
  label,
  children,
  mono = false,
  title,
}: Readonly<InsightRowProps>) {
  return (
    <div className="grid grid-cols-[6.75rem_minmax(0,1fr)] gap-2" title={title}>
      <dt className="text-muted-foreground whitespace-nowrap">{label}</dt>
      <dd
        className={cn(
          'text-foreground min-w-0 truncate',
          mono && 'font-mono tabular-nums',
        )}
      >
        {children}
      </dd>
    </div>
  )
}
