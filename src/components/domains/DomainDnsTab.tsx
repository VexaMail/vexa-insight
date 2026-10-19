import { CopyIconButton, Panel, StatusPill } from '@/components/ui'
import { ArrowRight, Globe } from 'lucide-react'
import Link from 'next/link'
import { DnsCheckRow } from './DnsCheckRow'
import type { DomainDnsTabProps } from './DomainDnsTabProps'

/** Live DNS state per protocol, with the way into the full diagnostics. */
export function DomainDnsTab({
  domainName,
  score,
  dmarcRecord,
}: Readonly<DomainDnsTabProps>) {
  const gradeTone = {
    A: 'success',
    B: 'success',
    C: 'warning',
    D: 'danger',
    F: 'danger',
  } as const
  return (
    <Panel
      flush
      icon={<Globe />}
      title="DNS, checked live"
      description={`Security score ${String(score.percentage)}/100: SPF, DKIM and DMARC make the core; MTA-STS, TLS-RPT and BIMI add on top.`}
      actions={
        <>
          <StatusPill tone={gradeTone[score.grade]} variant="solid">
            Grade {score.grade}
          </StatusPill>
          <Link
            href={`/diagnostics/${encodeURIComponent(domainName)}`}
            className="text-primary inline-flex min-h-10 items-center gap-1 text-sm font-medium underline-offset-2 hover:underline"
          >
            Full diagnostics <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </>
      }
    >
      <div className="border-border flex items-start gap-2 border-b px-4 py-3">
        <code className="text-foreground min-w-0 flex-1 font-mono text-xs break-all">
          {dmarcRecord ?? `No DMARC record at _dmarc.${domainName}`}
        </code>
        {dmarcRecord ? (
          <CopyIconButton value={dmarcRecord} label="DMARC record" />
        ) : null}
      </div>
      <ul className="divide-border divide-y">
        {score.checks.map((check) => (
          <DnsCheckRow key={check.id} check={check} />
        ))}
      </ul>
    </Panel>
  )
}
