import { formatEta, formatPollStatusTime } from '@/utils/format'
import { Activity, CheckCircle, Clock, Zap } from 'lucide-react'
import type { PollStatusCardProps } from './PollStatusCardProps'

export default function PollStatusCard({
  status,
}: Readonly<PollStatusCardProps>) {
  const {
    isRunning,
    lastCheck,
    currentProcessed,
    totalEmails,
    processingEmails,
    etaMs,
  } = status

  const lastCheckFormatted = lastCheck
    ? formatPollStatusTime(lastCheck)
    : 'Never'

  const percentRaw =
    totalEmails > 0 ? (currentProcessed / totalEmails) * 100 : 0
  const percent = Math.min(100, Math.max(0, Math.round(percentRaw)))

  return (
    <div className="glass-card-hover p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="text-primary h-4 w-4" />
          <h3 className="font-display text-foreground text-sm font-semibold">
            Ingestion Health
          </h3>
        </div>
        <div
          className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
            isRunning ? 'bg-info/10 text-info' : 'bg-success/10 text-success'
          }`}
        >
          <CheckCircle className="h-3 w-3" />
          {isRunning ? 'Running' : 'Idle'}
        </div>
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

        {isRunning && totalEmails > 0 && (
          <>
            <div className="bg-secondary h-1.5 w-full overflow-hidden rounded-full">
              <div
                className="bg-primary h-full rounded-full transition-all duration-500 ease-in-out"
                style={{ width: `${percent}%` }}
              />
            </div>
            <div className="text-muted-foreground flex items-center justify-between text-xs">
              <div className="flex items-center gap-1">
                <Zap className="h-3 w-3" />
                <span>
                  Concurrency:{' '}
                  <strong className="text-foreground">
                    {processingEmails}
                  </strong>
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>
                  ETA:{' '}
                  <strong className="text-foreground">
                    {formatEta(etaMs)}
                  </strong>
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
