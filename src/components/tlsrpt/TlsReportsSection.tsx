import { TlsFailuresTable } from './TlsFailuresTable'
import type { TlsReportsSectionProps } from './TlsReportsSectionProps'
import { TlsSummaryTable } from './TlsSummaryTable'

/**
 * SMTP TLS reporting (RFC 8460) for one domain: how many inbound sessions
 * each sender managed over TLS, and why the failed ones failed.
 */
export function TlsReportsSection({
  domainName,
  summary,
  failures,
}: TlsReportsSectionProps) {
  return (
    <section aria-labelledby="tls-heading">
      <h2
        id="tls-heading"
        className="mb-3 text-lg font-medium text-zinc-900 dark:text-zinc-50"
      >
        TLS reports (inbound mail)
      </h2>
      {summary.length === 0 ? (
        <p className="text-muted-foreground text-sm">
          No TLS reports yet. Publish a TXT record at{' '}
          <code className="font-mono">_smtp._tls.{domainName}</code> with{' '}
          <code className="font-mono">v=TLSRPTv1; rua=mailto:…</code> pointing
          at a mailbox this instance polls, and senders such as Google and
          Microsoft will report daily.
        </p>
      ) : (
        <div className="space-y-6">
          <TlsSummaryTable rows={summary} />
          {failures.length > 0 && <TlsFailuresTable rows={failures} />}
        </div>
      )}
    </section>
  )
}
