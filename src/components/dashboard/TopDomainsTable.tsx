'use client'

import { useTopDomainsTable } from '@/hooks/dashboard'
import Link from 'next/link'

import { Skeleton } from '@/components/ui'

export default function TopDomainsTable() {
  const { maxMessages, topDomains, isLoading } = useTopDomainsTable()

  if (isLoading) {
    return (
      <div className="glass-card p-5">
        <h3 className="font-display text-foreground mb-4 text-sm font-semibold">
          Top Domains
        </h3>
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="space-y-2 p-3">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-1/4" />
              </div>
              <Skeleton className="bg-secondary h-1.5 w-full rounded-full" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (topDomains.length === 0) {
    return (
      <div className="glass-card p-5">
        <h3 className="font-display text-foreground mb-4 text-sm font-semibold">
          Top Domains
        </h3>
        <div className="border-border/50 flex h-32 items-center justify-center rounded-lg border border-dashed">
          <p className="text-muted-foreground text-sm">
            No domains yet. Ingest DMARC reports to see top domains.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="glass-card p-5">
      <h3 className="font-display text-foreground mb-4 text-sm font-semibold">
        Top Domains
      </h3>

      <div className="space-y-3">
        {topDomains.map((d) => {
          const pct =
            maxMessages > 0 ? (d.totalMessages / maxMessages) * 100 : 0
          let complianceColor = 'text-danger'
          if (d.passRatePercent >= 95) complianceColor = 'text-success'
          else if (d.passRatePercent >= 80) complianceColor = 'text-warning'

          let barColor = 'bg-danger'
          if (d.passRatePercent >= 95) barColor = 'bg-success'
          else if (d.passRatePercent >= 80) barColor = 'bg-warning'

          return (
            <Link
              key={d.domainId}
              href={`/domains/${d.domainName}`}
              className="-mx-3 block space-y-1.5 rounded-lg p-3 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="text-foreground font-medium">
                  {d.domainName}
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-muted-foreground">
                    {d.totalMessages.toLocaleString()} msgs
                  </span>
                  <span className={`font-semibold ${complianceColor}`}>
                    {d.passRatePercent.toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="bg-secondary h-1.5 w-full overflow-hidden rounded-full">
                <div
                  className={`h-full rounded-full transition-all ${barColor}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
