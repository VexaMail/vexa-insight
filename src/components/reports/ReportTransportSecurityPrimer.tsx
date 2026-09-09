import { ChevronRight } from 'lucide-react'

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
    <details className="group rounded-lg border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-800">
      <summary className="flex cursor-pointer items-center gap-2 px-4 py-3 text-sm font-medium text-zinc-700 select-none dark:text-zinc-300">
        <ChevronRight
          className="h-4 w-4 transition-transform group-open:rotate-90"
          aria-hidden="true"
        />
        Transport security primer (MTA-STS & TLS-RPT)
      </summary>
      <div className="space-y-4 border-t border-zinc-200 p-4 text-sm text-zinc-700 dark:border-zinc-700 dark:text-zinc-300">
        <p className="text-muted-foreground">
          DMARC aggregate reports show authentication alignment (SPF, DKIM,
          disposition).{' '}
          <abbr title="Mail Transfer Agent Strict Transport Security">
            MTA-STS
          </abbr>{' '}
          is separate: it tells other mail servers to use encrypted SMTP to your
          MX hosts and which hostnames are allowed, reducing downgrade and
          interception risk on the wire.
        </p>
        <p className="text-muted-foreground">
          Pair MTA-STS with <abbr title="TLS Reporting">TLS-RPT</abbr> so you
          receive aggregate feedback when senders hit TLS problems delivering to
          your infrastructure. Together they complement DMARC, which does not
          replace transport-layer policy.
        </p>
        {hintLine ? (
          <p className="text-muted-foreground border-l-2 border-zinc-300 pl-3 dark:border-zinc-600">
            {hintLine}
          </p>
        ) : null}
        <TransportSecurityChecklist />
        <TransportSecurityReferences />
      </div>
    </details>
  )
}
