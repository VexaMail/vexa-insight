import { TabNav } from '@/components/ui'
import type { IpDetailViewProps } from '@/types/ips'
import { IpDetailFacts } from './IpDetailFacts'
import { IpDetailHeader } from './IpDetailHeader'
import { IpDetailKpis } from './IpDetailKpis'
import { IpDetailTabContent } from './IpDetailTabContent'
import { IpOperatorReview } from './IpOperatorReview'

/**
 * A source's page: header, KPIs, facts, tabs, active tab, review. Below `lg`
 * the seen dates and dispositions move under the active tab, so a phone
 * reaches the authentication results without scrolling past metadata.
 */
export function IpDetailView({
  ctx,
  tab,
  actions,
}: Readonly<IpDetailViewProps>) {
  return (
    <div className="flex flex-col gap-6">
      <IpDetailHeader ctx={ctx} actions={actions} />
      <IpDetailKpis ctx={ctx} />
      <div className="max-lg:order-1">
        <IpDetailFacts ctx={ctx} />
      </div>
      <div className="space-y-4">
        <TabNav
          items={Object.values(ctx.tabs)}
          active={tab}
          label="Source sections"
        />
        <IpDetailTabContent ctx={ctx} tab={tab} />
      </div>
      <div className="max-lg:order-2">
        <IpOperatorReview
          ip={ctx.ip}
          domains={ctx.domains ?? []}
          reviews={ctx.reviews}
        />
      </div>
    </div>
  )
}
