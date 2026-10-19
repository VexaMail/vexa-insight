import { StatusPill } from '@/components/ui'
import type { StatusTone } from '@/types/ui'
import type { DnsCheckRowProps } from './DnsCheckRowProps'

/** One protocol's live DNS check: state, points and what to change. */
export function DnsCheckRow({ check }: Readonly<DnsCheckRowProps>) {
  let tone: StatusTone = 'warning'
  let label = 'Partial'
  if (check.earned >= check.max) {
    tone = 'success'
    label = 'OK'
  } else if (check.earned === 0) {
    tone = check.weight === 'core' ? 'danger' : 'unknown'
    label = check.weight === 'core' ? 'Missing' : 'Not set'
  }
  return (
    <li className="grid gap-2 px-4 py-3 sm:grid-cols-[8rem_6rem_minmax(0,1fr)_5rem] sm:items-center">
      <span className="text-foreground text-sm font-semibold">
        {check.label}
        <span className="text-muted-foreground ml-2 text-xs font-normal">
          {check.weight === 'core' ? 'core' : 'bonus'}
        </span>
      </span>
      <span>
        <StatusPill tone={tone} dot>
          {label}
        </StatusPill>
      </span>
      <span className="text-muted-foreground text-sm">{check.detail}</span>
      <span className="text-foreground font-mono text-xs tabular-nums sm:text-right">
        {check.earned}/{check.max} pts
      </span>
    </li>
  )
}
