import type { IpDetailContextProps } from '@/types/ips'
import { IpAuthResultsPanel } from './IpAuthResultsPanel'
import { IpOverviewTimeline } from './IpOverviewTimeline'
import { IpRelatedDomainCard } from './IpRelatedDomainCard'
import { IpReportEvidenceCard } from './IpReportEvidenceCard'
import { IpReputationPanel } from './IpReputationPanel'
import { IpSourceInfoPanel } from './IpSourceInfoPanel'

/** Identity, authentication with its evidence, the timeline and context. */
export function IpOverviewTab({ ctx }: Readonly<IpDetailContextProps>) {
  return (
    <div className="grid items-start gap-4 lg:grid-cols-2 xl:grid-cols-3">
      <IpSourceInfoPanel ctx={ctx} />
      <div className="flex min-w-0 flex-col gap-4">
        <IpAuthResultsPanel ctx={ctx} />
        <div className="grid gap-4 sm:grid-cols-2">
          <IpRelatedDomainCard ctx={ctx} />
          <IpReportEvidenceCard ctx={ctx} />
        </div>
      </div>
      <div className="flex min-w-0 flex-col gap-4 lg:col-span-2 xl:col-span-1">
        <IpOverviewTimeline ctx={ctx} />
        <IpReputationPanel
          ip={ctx.ip}
          hostname={ctx.data.hostname}
          cause={ctx.cause}
        />
      </div>
    </div>
  )
}
