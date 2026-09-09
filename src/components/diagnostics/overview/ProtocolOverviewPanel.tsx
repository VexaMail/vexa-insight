import { Mail, ShieldCheck } from 'lucide-react'
import { deriveProtocolDetails } from './deriveProtocolDetails'
import { deriveProtocolStatuses } from './deriveProtocolStatuses'
import { IncomingMailRows } from './IncomingMailRows'
import { OutgoingMailRows } from './OutgoingMailRows'
import { ProtocolGroupCard } from './ProtocolGroupCard'
import type { ProtocolOverviewPanelProps } from './ProtocolOverviewPanelProps'

export function ProtocolOverviewPanel({
  dns,
  onOpenSection,
}: Readonly<ProtocolOverviewPanelProps>) {
  const status = deriveProtocolStatuses(dns)
  const details = deriveProtocolDetails(dns)

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <ProtocolGroupCard
        icon={<Mail className="text-primary h-5 w-5" />}
        title="Outgoing Mail"
      >
        <OutgoingMailRows
          status={status}
          details={details}
          onOpenSection={onOpenSection}
        />
      </ProtocolGroupCard>
      <ProtocolGroupCard
        icon={<ShieldCheck className="text-primary h-5 w-5" />}
        title="Incoming Mail"
      >
        <IncomingMailRows
          status={status}
          details={details}
          onOpenSection={onOpenSection}
        />
      </ProtocolGroupCard>
    </div>
  )
}
