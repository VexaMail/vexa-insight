import type { ReasonBarProps } from './ReasonBarProps'

/** One failure reason as a bar of the failing messages that show it. */
export function ReasonBar({ reason, outOf }: Readonly<ReasonBarProps>) {
  const share = outOf > 0 ? (reason.messages / outOf) * 100 : 0
  return (
    <li className="grid grid-cols-[minmax(0,1fr)_2.75rem_auto] items-center gap-2 text-xs">
      <span className="text-muted-foreground truncate" title={reason.label}>
        {reason.label}
      </span>
      <span
        className="bg-secondary h-1.5 overflow-hidden rounded-full"
        aria-hidden
      >
        <span
          className="bg-danger block h-full rounded-full"
          style={{ width: `${String(share)}%` }}
        />
      </span>
      <span className="text-foreground w-10 text-right font-mono tabular-nums">
        {reason.messages.toLocaleString('en-US')}
      </span>
    </li>
  )
}
