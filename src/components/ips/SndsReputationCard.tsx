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
    <section className="glass-card flex flex-col space-y-4 p-4 sm:p-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
        Outlook.com reputation (Microsoft SNDS)
      </h2>
      {rows.length === 0 ? (
        <p className="text-muted-foreground text-sm">
          No SNDS data yet. SNDS publishes a day after it ends, and only for IPs
          that sent mail to Outlook.com.
        </p>
      ) : (
        <SndsReputationTable rows={rows} />
      )}
      {statusRows.length > 0 ? (
        <SndsStatusList statusRows={statusRows} />
      ) : null}
    </section>
  )
}
