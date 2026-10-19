import type { HealthFactProps } from '@/types/ingest'

/** A label and its value on one line of a health tile. */
export function HealthFact({
  label,
  children,
  title,
}: Readonly<HealthFactProps>) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt className="text-muted-foreground shrink-0 text-xs">{label}</dt>
      <dd
        className="text-foreground min-w-0 truncate text-right text-xs font-medium tabular-nums"
        title={title}
      >
        {children}
      </dd>
    </div>
  )
}
