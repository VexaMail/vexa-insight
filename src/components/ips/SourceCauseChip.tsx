import { STATUS_TONE_DOT_CLASSES } from '@/constants/ui'
import { cn } from '@/lib/utils'
import type { SourceCauseChipProps } from '@/types/ips'
import Link from 'next/link'

/** One cause filter with its source count. */
export function SourceCauseChip({
  href,
  label,
  count,
  tone,
  active,
  title,
}: Readonly<SourceCauseChipProps>) {
  return (
    <Link
      href={href}
      scroll={false}
      title={title}
      aria-current={active ? 'true' : undefined}
      className={cn(
        'focus-visible:ring-ring inline-flex min-h-10 items-center gap-2 rounded-md border px-3 text-sm font-medium transition-colors duration-150 focus-visible:ring-2 focus-visible:outline-none',
        active
          ? 'border-primary/50 bg-primary/10 text-foreground'
          : 'border-border bg-card text-muted-foreground hover:text-foreground hover:bg-accent',
      )}
    >
      <span
        aria-hidden
        className={cn('h-2 w-2 rounded-full', STATUS_TONE_DOT_CLASSES[tone])}
      />
      {label}
      <span className="bg-secondary text-muted-foreground rounded px-1.5 font-mono text-[11px] tabular-nums">
        {count.toLocaleString('en-US')}
      </span>
    </Link>
  )
}
