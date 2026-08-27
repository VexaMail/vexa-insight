import { Mail, ShieldCheck } from 'lucide-react'
import type { ProtocolOverviewPanelProps } from './ProtocolOverviewPanelProps'
import { ProtocolStatusRow } from './ProtocolStatusRow'
import { deriveProtocolStatus } from './deriveProtocolStatus'

export function ProtocolOverviewPanel({
  dns,
}: Readonly<ProtocolOverviewPanelProps>) {
  const spfStatus = deriveProtocolStatus(dns.spf !== null, dns.spfValid)
  const dkimStatus = deriveProtocolStatus(
    dns.dkim.some((d) => d.record !== null),
    dns.dkim.some((d) => d.valid),
  )
  const dmarcStatus = deriveProtocolStatus(dns.dmarc !== null, dns.dmarcValid)
  const bimiStatus = deriveProtocolStatus(dns.bimi.raw !== null, dns.bimi.valid)
  const mtaStsStatus = deriveProtocolStatus(
    dns.mtaSts.raw !== null,
    dns.mtaSts.valid,
  )
  const tlsRptStatus = deriveProtocolStatus(
    dns.tlsRpt.raw !== null,
    dns.tlsRpt.valid,
  )

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
            status={spfStatus}
            {...(dns.spf ? { detail: 'Record found' } : {})}
          />
          <ProtocolStatusRow
            protocol="DKIM"
            status={dkimStatus}
            {...(dns.dkim.filter((d) => d.valid).length > 0
              ? {
                  detail: `${dns.dkim.filter((d) => d.valid).length} selector(s)`,
                }
              : {})}
          />
          <ProtocolStatusRow
            protocol="DMARC"
            status={dmarcStatus}
            {...(dns.dmarcPolicy
              ? { detail: `Policy: ${dns.dmarcPolicy}` }
              : {})}
          />
          <ProtocolStatusRow
            protocol="BIMI"
            status={bimiStatus}
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
            status={mtaStsStatus}
            {...(dns.mtaSts.mode ? { detail: `Mode: ${dns.mtaSts.mode}` } : {})}
          />
          <ProtocolStatusRow
            protocol="TLS-RPT"
            status={tlsRptStatus}
            {...(dns.tlsRpt.ruaAddresses.length > 0
              ? { detail: `${dns.tlsRpt.ruaAddresses.length} RUA address(es)` }
              : {})}
          />
        </div>
      </div>
    </div>
  )
}
