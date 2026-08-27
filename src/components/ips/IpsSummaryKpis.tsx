import { KpiCard, KpiGrid } from '@/components/ui'
import { AlertTriangle, CheckCircle2, Network, Server } from 'lucide-react'
import type { IpsSummaryKpisProps } from './IpsSummaryKpisProps'

export default function IpsSummaryKpis({
  kpis,
}: Readonly<IpsSummaryKpisProps>) {
  return (
    <KpiGrid cols={4}>
      <KpiCard
        label="Total Sources"
        value={kpis.totalSources.toLocaleString()}
        icon={
          <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
            <Server className="text-primary h-5 w-5" aria-hidden="true" />
          </div>
        }
      />
      <KpiCard
        label="Healthy"
        value={kpis.healthySources.toLocaleString()}
        status="healthy"
        icon={
          <div className="bg-success/10 flex h-10 w-10 items-center justify-center rounded-lg">
            <CheckCircle2 className="text-success h-5 w-5" aria-hidden="true" />
          </div>
        }
      />
      <KpiCard
        label="Needs Review"
        value={kpis.needsReviewSources.toLocaleString()}
        status="degraded"
        icon={
          <div className="bg-warning/10 flex h-10 w-10 items-center justify-center rounded-lg">
            <AlertTriangle
              className="text-warning h-5 w-5"
              aria-hidden="true"
            />
          </div>
        }
      />
      <KpiCard
        label="Total Messages"
        value={kpis.totalMessages.toLocaleString()}
        icon={
          <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
            <Network className="text-primary h-5 w-5" aria-hidden="true" />
          </div>
        }
      />
    </KpiGrid>
  )
}
