import type { ProtocolDetails } from './ProtocolDetails'
import type { ProtocolOverviewPanelProps } from './ProtocolOverviewPanelProps'
import type { ProtocolStatuses } from './ProtocolStatuses'

export type ProtocolRowsProps = {
  status: ProtocolStatuses
  details: ProtocolDetails
  onOpenSection: ProtocolOverviewPanelProps['onOpenSection']
}
