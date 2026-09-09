import type { ProtocolRowsProps } from './ProtocolRowsProps'
import { ProtocolStatusRow } from './ProtocolStatusRow'

export function IncomingMailRows({
  status,
  details,
  onOpenSection,
}: Readonly<ProtocolRowsProps>) {
  return (
    <>
      <ProtocolStatusRow
        protocol="MTA-STS"
        sectionId="mta-sts"
        onOpenDetails={onOpenSection}
        status={status.mtaSts}
        detail={details.mtaSts}
      />
      <ProtocolStatusRow
        protocol="TLS-RPT"
        sectionId="tls-rpt"
        onOpenDetails={onOpenSection}
        status={status.tlsRpt}
        detail={details.tlsRpt}
      />
    </>
  )
}
