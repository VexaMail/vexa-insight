import { StatusPill } from '@/components/ui'
import { STATUS_TONE_TEXT_CLASSES } from '@/constants/ui'
import { cn } from '@/lib/utils'
import type { IpAuthCheckRowProps } from '@/types/ips'

/** One authentication fact: name, verdict, rate and its explanation. */
export function IpAuthCheckRow({
  check,
  total,
}: Readonly<IpAuthCheckRowProps>) {
  return (
    <li className="py-3 first:pt-0 last:pb-0">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <span className="text-foreground text-sm font-medium">
            {check.label}
          </span>
          <StatusPill tone={check.verdict.tone}>
            {check.verdict.label}
          </StatusPill>
        </div>
        <span
          className={cn(
            'shrink-0 font-mono text-sm font-semibold tabular-nums',
            STATUS_TONE_TEXT_CLASSES[check.verdict.tone],
          )}
          title={`${check.count.toLocaleString()} of ${total.toLocaleString()} messages`}
        >
          {check.rate.toFixed(1)}%
        </span>
      </div>
      <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
        {check.detail}
      </p>
    </li>
  )
}
