import type { IpDetailHeaderProps } from '@/types/ips'
import { buildIpInvestigateLinks } from '@/utils/ips'
import { IpAllowlistButton } from './IpAllowlistButton'
import { IpMenu } from './IpMenu'
import { IpMoreMenu } from './IpMoreMenu'

/** Investigate menu, allowlist, more actions and the page's own controls. */
export function IpHeaderActions({
  ctx,
  actions,
}: Readonly<IpDetailHeaderProps>) {
  const domains = (ctx.domains ?? []).map((row) => row.domain)
  const [only] = domains
  const initialVerdict =
    ctx.reviews.find((review) => review.domainName === only)?.verdict ?? null
  return (
    <>
      <IpMenu
        label="Investigate"
        trigger="investigate"
        items={buildIpInvestigateLinks(ctx)}
      />
      <IpAllowlistButton
        ip={ctx.ip}
        domains={domains}
        initialVerdict={initialVerdict}
      />
      <IpMoreMenu ip={ctx.ip} hostname={ctx.data.hostname} />
      {actions}
    </>
  )
}
