import { STATUS_TONE_TEXT_CLASSES } from '@/constants/ui'
import { cn } from '@/lib/utils'
import type { IpReputationRowProps } from '@/types/ips'
import { IpAuthCheckIcon } from './IpAuthCheckIcon'

/** One context signal: name, what was found, and its mark. */
export function IpReputationRow({
  label,
  status,
  action,
  title,
}: Readonly<IpReputationRowProps>) {
  return (
    <div
      className="grid min-h-10 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 py-1.5"
      title={title}
    >
      <dt className="text-muted-foreground text-sm whitespace-nowrap">
        {label}
      </dt>
      <dd className="text-foreground truncate text-right text-sm">
        {status.value}
      </dd>
      <dd className="flex items-center justify-end gap-1.5 text-xs">
        {action ?? (
          <>
            <IpAuthCheckIcon tone={status.tone} className="h-4 w-4" />
            <span className={cn(STATUS_TONE_TEXT_CLASSES[status.tone])}>
              {status.label}
            </span>
          </>
        )}
      </dd>
    </div>
  )
}
