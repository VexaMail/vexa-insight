import type { IngestFactGroupProps } from '@/types/ingest'

/**
 * One kind of ingestion fact under its own caption, so what is configured
 * now, what the runs did and how fresh the data is never read as one list.
 */
export function IngestFactGroup({
  title,
  note,
  children,
}: Readonly<IngestFactGroupProps>) {
  return (
    <section className="border-border border-b last:border-b-0">
      <header className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 px-4 pt-3 pb-1 sm:px-5">
        <h3 className="text-muted-foreground font-mono text-[11px] font-medium tracking-[0.08em] uppercase">
          {title}
        </h3>
        {note ? <p className="text-muted-foreground text-xs">{note}</p> : null}
      </header>
      <dl className="divide-border divide-y">{children}</dl>
    </section>
  )
}
