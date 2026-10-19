import { Panel } from '@/components/ui'
import { ShieldCheck } from 'lucide-react'
import type { SndsReputationCardProps } from './SndsReputationCardProps'
import { SndsReputationTable } from './SndsReputationTable'
import { SndsStatusList } from './SndsStatusList'

/**
 * Outlook.com's view of the sending IPs, from Microsoft SNDS: the latest day
 * per IP and any range SNDS currently lists as blocked or flagged.
 */
export function SndsReputationCard({
  rows,
  statusRows,
}: SndsReputationCardProps) {
  return (
    <Panel
      title="Outlook.com reputation"
      description="Microsoft SNDS, latest published day per IP"
      icon={<ShieldCheck />}
      flush
    >
      {rows.length === 0 ? (
        <p className="text-muted-foreground p-4 text-sm">
          No SNDS data yet. SNDS publishes a day after it ends, and only for IPs
          that sent mail to Outlook.com.
        </p>
      ) : (
        <SndsReputationTable rows={rows} />
      )}
      {statusRows.length > 0 ? (
        <SndsStatusList statusRows={statusRows} />
      ) : null}
    </Panel>
  )
}
