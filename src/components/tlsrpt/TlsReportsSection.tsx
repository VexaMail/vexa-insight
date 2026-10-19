import { Panel } from '@/components/ui'
import { Lock } from 'lucide-react'
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
    <Panel
      icon={<Lock />}
      title="TLS reports (inbound mail)"
      description="Sessions other servers opened to your MX over TLS, as they reported them."
    >
      {summary.length === 0 ? (
        <p className="text-muted-foreground text-sm">
          No TLS reports yet. Publish a TXT record at{' '}
          <code className="font-mono">_smtp._tls.{domainName}</code> with{' '}
          <code className="font-mono">v=TLSRPTv1; rua=mailto:…</code> pointing
          at a mailbox this instance polls (or{' '}
          <code className="font-mono">rua=https://…/api/v1/tlsrpt</code>), and
          senders such as Google and Microsoft will report daily.
        </p>
      ) : (
        <div className="space-y-4">
          <TlsSummaryTable rows={summary} />
          {failures.length > 0 && <TlsFailuresTable rows={failures} />}
        </div>
      )}
    </Panel>
  )
}
