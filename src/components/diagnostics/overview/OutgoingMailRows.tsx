import type { ProtocolRowsProps } from './ProtocolRowsProps'
import { ProtocolStatusRow } from './ProtocolStatusRow'

export function OutgoingMailRows({
  status,
  details,
  onOpenSection,
}: Readonly<ProtocolRowsProps>) {
  return (
    <>
      <ProtocolStatusRow
        protocol="SPF"
        sectionId="spf"
        onOpenDetails={onOpenSection}
        status={status.spf}
        detail={details.spf}
      />
      <ProtocolStatusRow
        protocol="DKIM"
        sectionId="dkim"
        onOpenDetails={onOpenSection}
        status={status.dkim}
        detail={details.dkim}
      />
      <ProtocolStatusRow
        protocol="DMARC"
        sectionId="dmarc"
        onOpenDetails={onOpenSection}
        status={status.dmarc}
        detail={details.dmarc}
      />
      <ProtocolStatusRow
        protocol="BIMI"
        sectionId="bimi"
        onOpenDetails={onOpenSection}
        status={status.bimi}
        detail={details.bimi}
      />
    </>
  )
}
