import { StatusPill } from '@/components/ui'
import { STATUS_TONE_DOT_CLASSES } from '@/constants/ui'
import { cn } from '@/lib/utils'
import type { HealthTileProps } from '@/types/ingest'

/** One health dimension on the card surface, its state stated in words. */
export function HealthTile({
  title,
  icon,
  verdict,
  children,
}: Readonly<HealthTileProps>) {
  return (
    <section className="glass-card relative flex min-w-0 flex-col gap-3 overflow-hidden p-4">
      <span
        aria-hidden
        className={cn(
          'absolute inset-y-0 left-0 w-0.5',
          STATUS_TONE_DOT_CLASSES[verdict.tone],
        )}
      />
      <header className="flex flex-wrap items-start justify-between gap-2">
        <h3 className="text-foreground flex items-center gap-2 text-sm font-semibold">
          <span className="text-muted-foreground [&_svg]:h-4 [&_svg]:w-4">
            {icon}
          </span>
          {title}
        </h3>
        <StatusPill tone={verdict.tone} dot>
          {verdict.label}
        </StatusPill>
      </header>
      <dl className="space-y-2 text-sm">{children}</dl>
    </section>
  )
}
