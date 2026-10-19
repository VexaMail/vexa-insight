import { TabNav } from '@/components/ui'
import type { IpDetailViewProps } from '@/types/ips'
import { IpDetailFacts } from './IpDetailFacts'
import { IpDetailHeader } from './IpDetailHeader'
import { IpDetailKpis } from './IpDetailKpis'
import { IpDetailTabContent } from './IpDetailTabContent'
import { IpOperatorReview } from './IpOperatorReview'

/** A sending source's page: header, KPIs, facts, tabs, active tab, review. */
export function IpDetailView({
  ctx,
  tab,
  actions,
}: Readonly<IpDetailViewProps>) {
  return (
    <div className="space-y-6">
      <IpDetailHeader ctx={ctx} actions={actions} />
      <IpDetailKpis ctx={ctx} />
      <IpDetailFacts ctx={ctx} />
      <div className="space-y-4">
        <TabNav
          items={Object.values(ctx.tabs)}
          active={tab}
          label="Source sections"
        />
        <IpDetailTabContent ctx={ctx} tab={tab} />
      </div>
      <IpOperatorReview
        ip={ctx.ip}
        domains={ctx.domains ?? []}
        reviews={ctx.reviews}
      />
    </div>
  )
}
