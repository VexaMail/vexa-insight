import { ChevronRight } from 'lucide-react'

import type { ReportTransportSecurityPrimerProps } from './ReportTransportSecurityPrimerProps'

export function ReportTransportSecurityPrimer({
  domainHints = [],
}: Readonly<ReportTransportSecurityPrimerProps>) {
  const rfcMtaStsHref = 'https://www.rfc-editor.org/rfc/rfc8461'
  const rfcTlsRptHref = 'https://www.rfc-editor.org/rfc/rfc8460'
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
        <div>
          <p className="text-foreground mb-2 font-medium">
            Checklist (high level)
          </p>
          <ul className="text-muted-foreground list-inside list-disc space-y-1.5">
            <li>
              Publish a policy file at{' '}
              <code className="rounded bg-zinc-100 px-1 font-mono text-xs dark:bg-zinc-900">
                https://mta-sts.your-domain/.well-known/mta-sts.txt
              </code>{' '}
              over HTTPS with a publicly trusted certificate for{' '}
              <code className="rounded bg-zinc-100 px-1 font-mono text-xs dark:bg-zinc-900">
                mta-sts.your-domain
              </code>{' '}
              (replace <span className="font-mono">your-domain</span> with your
              apex domain).
            </li>
            <li>
              Add a <code className="font-mono text-xs">TXT</code> record at{' '}
              <code className="rounded bg-zinc-100 px-1 font-mono text-xs dark:bg-zinc-900">
                _mta-sts.your-domain
              </code>{' '}
              (e.g. <code className="font-mono text-xs">v=STSv1; id=…</code> —
              bump <code className="font-mono text-xs">id</code> when the policy
              changes).
            </li>
            <li>
              Include every MX hostname from your DNS in the policy; keep them
              consistent with live MX records.
            </li>
            <li>
              Start with{' '}
              <code className="font-mono text-xs">mode: testing</code>, monitor
              delivery and TLS reports, then move to{' '}
              <code className="font-mono text-xs">mode: enforce</code> when
              confident.
            </li>
            <li>
              Ensure inbound MX servers negotiate TLS 1.2 or higher for SMTP.
            </li>
          </ul>
        </div>
        <p className="text-muted-foreground">
          Normative references:{' '}
          <a
            href={rfcMtaStsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground font-medium underline underline-offset-2 hover:no-underline"
          >
            RFC 8461 (MTA-STS)
          </a>
          ,{' '}
          <a
            href={rfcTlsRptHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground font-medium underline underline-offset-2 hover:no-underline"
          >
            RFC 8460 (TLS-RPT)
          </a>
          .
        </p>
      </div>
    </details>
  )
}
