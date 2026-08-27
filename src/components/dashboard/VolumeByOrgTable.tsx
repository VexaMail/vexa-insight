'use client'

import { Skeleton } from '@/components/ui'
import { useVolumeByOrgTable } from '@/hooks/dashboard'
import Link from 'next/link'

export default function VolumeByOrgTable() {
  const { maxCount, rows, isLoading } = useVolumeByOrgTable()

  if (isLoading) {
    return (
      <div className="glass-card p-5">
        <h3 className="font-display text-foreground mb-4 text-sm font-semibold">
          Volume by Reporting Organization
        </h3>
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="space-y-2 p-3">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-12" />
              </div>
              <Skeleton className="h-1.5 w-full rounded-full" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (rows.length === 0) {
    return (
      <div className="glass-card p-5">
        <h3 className="font-display text-foreground mb-4 text-sm font-semibold">
          Volume by Reporting Organization
        </h3>
        <div className="border-border/50 flex h-32 items-center justify-center rounded-lg border border-dashed">
          <p className="text-muted-foreground text-sm">
            No reporting orgs yet. Ingest DMARC reports to see volume by org.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="glass-card p-5">
      <h3 className="font-display text-foreground mb-4 text-sm font-semibold">
        Volume by Reporting Organization
      </h3>

      <div className="space-y-3">
        {rows.slice(0, 15).map((r) => {
          const pct = maxCount > 0 ? (r.reportCount / maxCount) * 100 : 0
          return (
            <Link
              key={r.orgName}
              href={`/reports?org=${encodeURIComponent(r.orgName)}`}
              className="-mx-3 block space-y-1.5 rounded-lg p-3 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="text-foreground font-medium">{r.orgName}</span>
                <span className="text-muted-foreground">
                  {r.reportCount.toLocaleString()}
                </span>
              </div>
              <div className="bg-secondary h-1.5 w-full overflow-hidden rounded-full">
                <div
                  className="bg-primary h-full rounded-full transition-all"
                  style={{ width: `${String(pct)}%` }}
                />
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
