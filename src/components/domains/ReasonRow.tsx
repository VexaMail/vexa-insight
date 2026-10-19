import { REASON_DOT_CLASSES } from '@/constants/domains'
import { cn } from '@/lib/utils'
import type { ReasonRowProps } from './ReasonRowProps'

/** One failure reason: colour dot, label and share of the failing messages. */
export function ReasonRow({ reason, outOf, index }: Readonly<ReasonRowProps>) {
  const share = outOf > 0 ? (reason.messages / outOf) * 100 : 0
  return (
    <li
      className="flex items-center gap-2 text-xs"
      title={`${reason.messages.toLocaleString('en-US')} of ${outOf.toLocaleString('en-US')} failing messages; one message can fail for two reasons`}
    >
      <span
        aria-hidden
        className={cn(
          'h-2 w-2 shrink-0 rounded-full',
          REASON_DOT_CLASSES[index] ?? 'bg-unknown',
        )}
      />
      <span className="text-foreground min-w-0 flex-1 truncate">
        {reason.label}
      </span>
      <span className="text-muted-foreground font-mono tabular-nums">
        {share.toFixed(0)}%
      </span>
    </li>
  )
}
