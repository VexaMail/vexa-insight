import { SndsReputationCard } from './SndsReputationCard'
import type { SndsReputationPanelProps } from './SndsReputationPanelProps'

/** The SNDS card when there is SNDS data or a connection, else nothing. */
export function SndsReputationPanel({ panel }: SndsReputationPanelProps) {
  if (!panel) return null
  return <SndsReputationCard rows={panel.rows} statusRows={panel.statusRows} />
}
