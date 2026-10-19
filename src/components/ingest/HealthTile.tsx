import { IconTile, StatusPill } from '@/components/ui'
import type { HealthTileProps } from '@/types/ingest'

/** One health dimension, its icon tinted by its state, stated in words. */
export function HealthTile({
  title,
  icon,
  verdict,
  children,
}: Readonly<HealthTileProps>) {
  return (
    <section className="border-border bg-secondary/30 flex min-w-0 flex-col gap-3 rounded-lg border p-4">
      <header className="flex items-start gap-3">
        <IconTile size="sm" tone={verdict.tone}>
          {icon}
        </IconTile>
        <div className="min-w-0 space-y-1">
          <h3 className="text-foreground text-sm font-semibold">{title}</h3>
          <StatusPill tone={verdict.tone} dot>
            {verdict.label}
          </StatusPill>
        </div>
      </header>
      <dl className="space-y-2 text-sm">{children}</dl>
    </section>
  )
}
