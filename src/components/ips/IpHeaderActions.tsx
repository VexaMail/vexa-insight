import type { IpDetailHeaderProps } from '@/types/ips'
import { buildIpInvestigateLinks } from '@/utils/ips'
import { IpLegitimateSenderButton } from './IpLegitimateSenderButton'
import { IpMenu } from './IpMenu'
import { IpMoreMenu } from './IpMoreMenu'

/**
 * Investigate menu, allowlist, more actions and the page's own controls. A
 * phone packs them into two rows (investigate beside the window, then the
 * allowlist beside more); from `sm` they flow in one row as before.
 */
export function IpHeaderActions({
  ctx,
  actions,
}: Readonly<IpDetailHeaderProps>) {
  const domains = (ctx.domains ?? []).map((row) => row.domain)
  const [only] = domains
  const initialVerdict =
    ctx.reviews.find((review) => review.domainName === only)?.verdict ?? null
  return (
    <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">
      <div className="grid grid-cols-2 gap-2 sm:contents">
        <IpMenu
          label="Investigate"
          trigger="investigate"
          items={buildIpInvestigateLinks(ctx)}
        />
        {actions ? (
          <div className="min-w-0 sm:order-last">{actions}</div>
        ) : null}
      </div>
      <div className="flex gap-2 sm:contents">
        <div className="min-w-0 flex-1 *:w-full sm:flex-none sm:*:w-auto">
          <IpLegitimateSenderButton
            ip={ctx.ip}
            domains={domains}
            initialVerdict={initialVerdict}
          />
        </div>
        <IpMoreMenu ip={ctx.ip} hostname={ctx.data.hostname} />
      </div>
    </div>
  )
}
