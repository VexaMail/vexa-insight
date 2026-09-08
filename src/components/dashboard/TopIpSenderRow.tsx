import { IpDisplay } from '@/components/ips'
import { sharePercent } from '@/utils/dashboard'
import { ShareBar } from './ShareBar'
import type { TopIpSenderRowProps } from './TopIpSenderRowProps'

/** One sending IP of the top-senders list, with its hostname refresh control. */
export function TopIpSenderRow({
  sender,
  maxMessages,
  isRefreshing,
  onRefresh,
}: TopIpSenderRowProps) {
  return (
    <div className="-mx-3 space-y-1.5 rounded-lg p-3 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800/50">
      <div className="flex items-center justify-between text-xs">
        <div className="flex min-w-0 flex-1 items-center justify-start gap-1.5">
          <IpDisplay
            ip={sender.ip}
            countryCode={sender.countryCode}
            hostname={sender.hostname}
            layout="stacked"
            showHostname="if-present"
            isRefreshing={isRefreshing}
            onRefresh={(event) => {
              onRefresh(event)
            }}
            className="w-full"
          />
        </div>
        <span className="text-muted-foreground ml-3 shrink-0 tabular-nums">
          {sender.totalMessages.toLocaleString()} msgs
        </span>
      </div>
      <ShareBar
        percent={sharePercent(sender.totalMessages, maxMessages)}
        className="bg-primary duration-500"
      />
    </div>
  )
}
