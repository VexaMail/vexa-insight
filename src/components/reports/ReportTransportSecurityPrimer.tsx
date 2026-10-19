import { LockKeyhole } from 'lucide-react'

import { ReportCollapsible } from './ReportCollapsible'
import type { ReportTransportSecurityPrimerProps } from './ReportTransportSecurityPrimerProps'
import { TransportSecurityChecklist } from './TransportSecurityChecklist'
import { TransportSecurityReferences } from './TransportSecurityReferences'

export function ReportTransportSecurityPrimer({
  domainHints = [],
}: Readonly<ReportTransportSecurityPrimerProps>) {
  const uniqueHints = [...new Set(domainHints.filter(Boolean))]
  const hintLine =
    uniqueHints.length > 0
      ? `This report includes traffic for ${uniqueHints.join(', ')}. If you operate those domains, list every MX hostname your senders use in the MTA-STS policy so receiving MTAs do not fall back to opportunistic TLS by mistake.`
      : null

  return (
    <ReportCollapsible
      title="Transport security primer (MTA-STS & TLS-RPT)"
      icon={<LockKeyhole />}
    >
      <div className="text-muted-foreground space-y-4 text-sm">
        <p>
          DMARC aggregate reports show authentication alignment (SPF, DKIM,
          disposition).{' '}
          <abbr title="Mail Transfer Agent Strict Transport Security">
            MTA-STS
          </abbr>{' '}
          is separate: it tells other mail servers to use encrypted SMTP to your
          MX hosts and which hostnames are allowed, reducing downgrade and
          interception risk on the wire.
        </p>
        <p>
          Pair MTA-STS with <abbr title="TLS Reporting">TLS-RPT</abbr> so you
          receive aggregate feedback when senders hit TLS problems delivering to
          your infrastructure. Together they complement DMARC, which does not
          replace transport-layer policy.
        </p>
        {hintLine ? (
          <p className="border-primary/40 border-l-2 pl-3">{hintLine}</p>
        ) : null}
        <TransportSecurityChecklist />
        <TransportSecurityReferences />
      </div>
    </ReportCollapsible>
  )
}
