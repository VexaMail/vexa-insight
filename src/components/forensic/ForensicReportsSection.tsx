import type { ForensicReportsSectionProps } from './ForensicReportsSectionProps'
import { ForensicReportsTable } from './ForensicReportsTable'

/**
 * DMARC failure reports (RUF) for one domain. Each row is a single message a
 * receiver saw fail, which an aggregate report can only count.
 */
export function ForensicReportsSection({ rows }: ForensicReportsSectionProps) {
  return (
    <section aria-labelledby="forensic-heading">
      <h2
        id="forensic-heading"
        className="mb-3 text-lg font-medium text-zinc-900 dark:text-zinc-50"
      >
        Failure reports (RUF)
      </h2>
      {rows.length === 0 ? (
        <p className="text-muted-foreground text-sm">
          No failure reports yet. Add <code className="font-mono">ruf=</code>{' '}
          with a mailbox this instance polls to the DMARC record to receive
          them; Google and Microsoft do not send them, but many other receivers
          do.
        </p>
      ) : (
        <ForensicReportsTable rows={rows} />
      )}
    </section>
  )
}
