import type { IngestionFactProps } from './IngestionFactProps'

/** One row of the ingestion table: label, value and a secondary fact. */
export function IngestionFact({
  label,
  children,
  aside,
}: Readonly<IngestionFactProps>) {
  return (
    <div className="grid min-h-10 grid-cols-[112px_minmax(0,1fr)] items-center gap-x-3 gap-y-1 px-4 py-1.5 text-[13px] sm:grid-cols-[136px_minmax(0,1fr)_auto]">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-foreground min-w-0">{children}</dd>
      <dd className="text-muted-foreground col-start-2 text-xs sm:col-start-auto sm:text-right">
        {aside}
      </dd>
    </div>
  )
}
