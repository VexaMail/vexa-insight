import { Mail, ShieldCheck } from 'lucide-react'
import type { ProtocolOverviewPanelProps } from './ProtocolOverviewPanelProps'
import { ProtocolStatusRow } from './ProtocolStatusRow'
import { deriveProtocolStatuses } from './deriveProtocolStatuses'

export function ProtocolOverviewPanel({
  dns,
  onOpenSection,
}: Readonly<ProtocolOverviewPanelProps>) {
  const status = deriveProtocolStatuses(dns)

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {/* Outgoing mail */}
      <div className="bg-card rounded-xl border p-4 shadow-sm">
        <div className="mb-3 flex items-center gap-2">
          <Mail className="text-primary h-5 w-5" />
          <h3 className="text-foreground text-sm font-bold tracking-wide uppercase">
            Outgoing Mail
          </h3>
        </div>
        <div className="flex flex-col divide-y">
          <ProtocolStatusRow
            protocol="SPF"
            sectionId="spf"
            onOpenDetails={onOpenSection}
            status={status.spf}
            {...(dns.spf ? { detail: 'Record found' } : {})}
          />
          <ProtocolStatusRow
            protocol="DKIM"
            sectionId="dkim"
            onOpenDetails={onOpenSection}
            status={status.dkim}
            {...(dns.dkim.filter((d) => d.valid).length > 0
              ? {
                  detail: `${String(dns.dkim.filter((d) => d.valid).length)} selector(s)`,
                }
              : {})}
          />
          <ProtocolStatusRow
            protocol="DMARC"
            sectionId="dmarc"
            onOpenDetails={onOpenSection}
            status={status.dmarc}
            {...(dns.dmarcPolicy
              ? { detail: `Policy: ${dns.dmarcPolicy}` }
              : {})}
          />
          <ProtocolStatusRow
            protocol="BIMI"
            sectionId="bimi"
            onOpenDetails={onOpenSection}
            status={status.bimi}
            {...(dns.bimi.logoUrl ? { detail: 'Logo found' } : {})}
          />
        </div>
      </div>

      {/* Incoming mail */}
      <div className="bg-card rounded-xl border p-4 shadow-sm">
        <div className="mb-3 flex items-center gap-2">
          <ShieldCheck className="text-primary h-5 w-5" />
          <h3 className="text-foreground text-sm font-bold tracking-wide uppercase">
            Incoming Mail
          </h3>
        </div>
        <div className="flex flex-col divide-y">
          <ProtocolStatusRow
            protocol="MTA-STS"
            sectionId="mta-sts"
            onOpenDetails={onOpenSection}
            status={status.mtaSts}
            {...(dns.mtaSts.mode ? { detail: `Mode: ${dns.mtaSts.mode}` } : {})}
          />
          <ProtocolStatusRow
            protocol="TLS-RPT"
            sectionId="tls-rpt"
            onOpenDetails={onOpenSection}
            status={status.tlsRpt}
            {...(dns.tlsRpt.ruaAddresses.length > 0
              ? {
                  detail: `${String(dns.tlsRpt.ruaAddresses.length)} RUA address(es)`,
                }
              : {})}
          />
        </div>
      </div>
    </div>
  )
}
