import { STATUS_TONE_TEXT_CLASSES } from '@/constants/ui'
import { cn } from '@/lib/utils'
import type { IpFactProps } from '@/types/ips'

/** One labelled fact of the facts strip, led by its icon. */
export function IpFact({
  label,
  icon,
  tone = 'info',
  children,
}: Readonly<IpFactProps>) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <span
        aria-hidden
        className={cn(
          'shrink-0 [&_svg]:h-5 [&_svg]:w-5',
          STATUS_TONE_TEXT_CLASSES[tone],
        )}
      >
        {icon}
      </span>
      <div className="min-w-0">
        <dt className="text-muted-foreground text-xs">{label}</dt>
        <dd className="text-foreground mt-0.5 truncate text-sm font-medium">
          {children}
        </dd>
      </div>
    </div>
  )
}
