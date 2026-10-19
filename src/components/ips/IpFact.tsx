import { IconTile } from '@/components/ui'
import type { IpFactProps } from '@/types/ips'

/** One labelled fact of the facts strip, led by its icon. */
export function IpFact({
  label,
  icon,
  tone = 'info',
  children,
  sub,
}: Readonly<IpFactProps>) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <IconTile tone={tone} size="sm">
        {icon}
      </IconTile>
      <div className="min-w-0">
        <dt className="text-muted-foreground text-xs">{label}</dt>
        <dd className="text-foreground mt-0.5 truncate text-sm font-medium">
          {children}
        </dd>
        {sub ? (
          <dd className="text-muted-foreground truncate text-xs">{sub}</dd>
        ) : null}
      </div>
    </div>
  )
}
