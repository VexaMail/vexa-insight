import { pollProgressPercent } from '@/utils/dashboard'
import { formatPollStatusTime } from '@/utils/format'
import { Activity } from 'lucide-react'
import { PollStatusBadge } from './PollStatusBadge'
import type { PollStatusCardProps } from './PollStatusCardProps'
import { PollStatusProgress } from './PollStatusProgress'

export default function PollStatusCard({
  status,
}: Readonly<PollStatusCardProps>) {
  const { isRunning, lastCheck, currentProcessed, totalEmails } = status
  const lastCheckFormatted = lastCheck
    ? formatPollStatusTime(lastCheck)
    : 'Never'

  return (
    <div className="glass-card-hover p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="text-primary h-4 w-4" />
          <h3 className="font-display text-foreground text-sm font-semibold">
            Ingestion Health
          </h3>
        </div>
        <PollStatusBadge isRunning={isRunning} />
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Last run</span>
          <span className="text-foreground font-medium">
            {lastCheckFormatted}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Processed</span>
          <span className="text-foreground font-medium">
            {currentProcessed.toLocaleString()} emails
          </span>
        </div>

        {isRunning && totalEmails > 0 ? (
          <PollStatusProgress
            percent={pollProgressPercent(currentProcessed, totalEmails)}
            processingEmails={status.processingEmails}
            etaMs={status.etaMs}
          />
        ) : null}
      </div>
    </div>
  )
}
