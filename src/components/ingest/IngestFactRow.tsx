import type { IngestFactRowProps } from '@/types/ingest'

/** One row of the ingestion health table; the side note drops below on phones. */
export function IngestFactRow({
  label,
  children,
  aside,
}: Readonly<IngestFactRowProps>) {
  return (
    <div className="grid grid-cols-[8.5rem_minmax(0,1fr)] items-center gap-x-4 gap-y-1 px-4 py-2.5 text-sm sm:px-5 lg:grid-cols-[10rem_minmax(0,1fr)_minmax(0,14rem)]">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-foreground flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1">
        {children}
      </dd>
      {aside ? (
        <dd className="text-muted-foreground col-start-2 min-w-0 text-xs lg:col-start-3 lg:justify-self-end lg:text-right">
          {aside}
        </dd>
      ) : null}
    </div>
  )
}
