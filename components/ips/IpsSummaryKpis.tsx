import { AlertTriangle, CheckCircle2, Network, Server } from 'lucide-react'
import type { IpsSummaryKpisProps } from './IpsSummaryKpisProps'

export default function IpsSummaryKpis({
  kpis,
}: Readonly<IpsSummaryKpisProps>) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <div className="glass-card flex items-center gap-3 p-4">
        <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
          <Server className="text-primary h-5 w-5" />
        </div>
        <div>
          <p className="text-muted-foreground text-xs font-medium">
            Total Sources
          </p>
          <p className="text-2xl font-bold tabular-nums">
            {kpis.totalSources.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="glass-card flex items-center gap-3 p-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
          <CheckCircle2 className="h-5 w-5 text-emerald-500" />
        </div>
        <div>
          <p className="text-muted-foreground text-xs font-medium">Healthy</p>
          <p className="text-2xl font-bold tabular-nums">
            {kpis.healthySources.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="glass-card flex items-center gap-3 p-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
        </div>
        <div>
          <p className="text-muted-foreground text-xs font-medium">
            Needs Review
          </p>
          <p className="text-2xl font-bold tabular-nums">
            {kpis.needsReviewSources.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="glass-card flex items-center gap-3 p-4">
        <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
          <Network className="text-primary h-5 w-5" />
        </div>
        <div>
          <p className="text-muted-foreground text-xs font-medium">
            Total Messages
          </p>
          <p className="text-2xl font-bold tabular-nums">
            {kpis.totalMessages.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  )
}
