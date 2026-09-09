import { ShieldCheck } from 'lucide-react'
import { CollapsibleSection, ProtocolExplainer, RecordDisplay } from '../shared'
import { TlsRptChecksTable } from './TlsRptChecksTable'
import type { TlsRptDetailSectionProps } from './TlsRptDetailSectionProps'

export function TlsRptDetailSection({
  dns,
  open,
  onToggle,
}: Readonly<TlsRptDetailSectionProps>) {
  const tls = dns.tlsRpt

  return (
    <CollapsibleSection
      id="tls-rpt"
      open={open}
      onToggle={onToggle}
      title="TLS-RPT Configuration"
      found={tls.raw !== null}
      icon={<ShieldCheck className="text-primary h-6 w-6" />}
      helpText="TLS-RPT provides reporting for failed TLS delivery attempts and complements MTA-STS with operational visibility."
    >
      <RecordDisplay label="TLS-RPT" record={tls.raw} />
      <ProtocolExplainer
        title="Why TLS-RPT matters"
        summary="TLS-RPT does not enforce transport security by itself, but it tells you when remote senders fail TLS negotiation or fail to apply your MTA-STS policy."
        exampleHost={`_smtp._tls.${dns.domain}`}
        exampleValue={`v=TLSRPTv1; rua=mailto:tlsrpt@${dns.domain}`}
      />

      {tls.raw !== null && <TlsRptChecksTable tls={tls} />}
    </CollapsibleSection>
  )
}
