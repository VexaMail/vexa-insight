'use client'

import type { DnsDiagnosticsPanelProps } from './DnsDiagnosticsPanelProps'
import { DnsRecordsLoader } from './DnsRecordsLoader'

export function DnsDiagnosticsPanel({
  domainId,
  domainName,
}: Readonly<DnsDiagnosticsPanelProps>) {
  const hasDomainName = domainName.trim().length > 0

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-foreground text-lg font-semibold">
        Domain DNS Records
        {hasDomainName && (
          <span className="text-muted-foreground ml-2 text-sm font-normal">
            — {domainName}
          </span>
        )}
      </h2>
      <DnsRecordsLoader domainId={domainId} />
    </div>
  )
}
