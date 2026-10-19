import { ForensicReportsSection } from '@/components/forensic'
import { TlsReportsSection } from '@/components/tlsrpt'
import type { DomainTransportTabProps } from './DomainTransportTabProps'

/** SMTP TLS reports and DMARC failure reports of the domain. */
export function DomainTransportTab({
  domainName,
  tls,
  forensic,
}: Readonly<DomainTransportTabProps>) {
  return (
    <div className="space-y-4">
      <TlsReportsSection domainName={domainName} {...tls} />
      <ForensicReportsSection rows={forensic} />
    </div>
  )
}
