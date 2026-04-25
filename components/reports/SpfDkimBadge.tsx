import type { SpfDkimBadgeProps } from './SpfDkimBadgeProps'
import { SPF_DKIM_BADGE_STYLES } from './spfDkimBadgeStyles'
import { SPF_DKIM_DEFAULT_STYLE } from './spfDkimDefaultStyle'

export function SpfDkimBadge({ result }: Readonly<SpfDkimBadgeProps>) {
  const style = SPF_DKIM_BADGE_STYLES[result] ?? SPF_DKIM_DEFAULT_STYLE

  return (
    <span
      className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${style}`}
    >
      {result}
    </span>
  )
}
