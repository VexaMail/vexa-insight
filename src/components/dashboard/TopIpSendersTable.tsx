'use client'

import { IpDisplay } from '@/components/ips'
import { useTopIpSendersTable } from '@/hooks/dashboard'

import { Skeleton } from '@/components/ui'

export default function TopIpSendersTable() {
  const { ips, maxMessages, refreshingIps, handleRefreshClick, isLoading } =
    useTopIpSendersTable()

  if (isLoading) {
    return (
      <div className="glass-card p-5">
        <h3 className="font-display text-foreground mb-4 text-sm font-semibold">
          Top IP Senders
        </h3>
        <div className="space-y-3">
          <div className="space-y-2 p-3">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-1/4" />
            </div>
            <Skeleton className="bg-secondary h-1.5 w-full rounded-full" />
          </div>
          <div className="space-y-2 p-3">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-1/4" />
            </div>
            <Skeleton className="bg-secondary h-1.5 w-full rounded-full" />
          </div>
          <div className="space-y-2 p-3">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-1/4" />
            </div>
            <Skeleton className="bg-secondary h-1.5 w-full rounded-full" />
          </div>
          <div className="space-y-2 p-3">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-1/4" />
            </div>
            <Skeleton className="bg-secondary h-1.5 w-full rounded-full" />
          </div>
          <div className="space-y-2 p-3">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-1/4" />
            </div>
            <Skeleton className="bg-secondary h-1.5 w-full rounded-full" />
          </div>
        </div>
      </div>
    )
  }

  if (ips.length === 0) {
    return (
      <div className="glass-card p-5">
        <h3 className="font-display text-foreground mb-4 text-sm font-semibold">
          Top IP Senders
        </h3>
        <div className="border-border/50 flex h-32 items-center justify-center rounded-lg border border-dashed">
          <p className="text-muted-foreground text-sm">
            No IP data yet. Ingest DMARC reports to see top senders.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="glass-card p-5">
      <h3 className="font-display text-foreground mb-4 text-sm font-semibold">
        Top IP Senders
      </h3>

      <div className="space-y-3">
        {ips.slice(0, 15).map((sender) => {
          const pct =
            maxMessages > 0 ? (sender.totalMessages / maxMessages) * 100 : 0

          return (
            <div
              key={sender.ip}
              className="-mx-3 space-y-1.5 rounded-lg p-3 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
            >
              <div className="flex items-center justify-between text-xs">
                <div className="flex min-w-0 flex-1 items-center justify-start gap-1.5">
                  <IpDisplay
                    ip={sender.ip}
                    countryCode={sender.countryCode}
                    hostname={sender.hostname}
                    layout="stacked"
                    showHostname="if-present"
                    isRefreshing={refreshingIps.has(sender.ip)}
                    onRefresh={(e) => {
                      e.currentTarget.setAttribute('data-sender-ip', sender.ip)
                      handleRefreshClick(
                        e as React.MouseEvent<HTMLButtonElement>,
                      )
                    }}
                    className="w-full"
                  />
                </div>
                <span className="text-muted-foreground ml-3 shrink-0 tabular-nums">
                  {sender.totalMessages.toLocaleString()} msgs
                </span>
              </div>
              <div className="bg-secondary h-1.5 w-full overflow-hidden rounded-full">
                <div
                  className="bg-primary h-full rounded-full transition-all duration-500"
                  style={{ width: `${String(pct)}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
