import type { IngestionFactProps } from './IngestionFactProps'

/** One label and value line of the ingestion panel. */
export function IngestionFact({
  label,
  children,
}: Readonly<IngestionFactProps>) {
  return (
    <div className="grid min-h-10 grid-cols-[128px_minmax(0,1fr)] items-center gap-3 py-1.5 text-sm">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-foreground min-w-0">{children}</dd>
    </div>
  )
}
