import { formatRunAt } from '@/utils/format'
import { Clock } from 'lucide-react'
import type { CheckedAtNoteProps } from './CheckedAtNoteProps'

/** When the lookups ran, and which answers may be a few minutes older. */
export function CheckedAtNote({ checkedAt }: Readonly<CheckedAtNoteProps>) {
  return (
    <p className="text-muted-foreground inline-flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs">
      <Clock aria-hidden className="h-3.5 w-3.5 shrink-0" />
      <span>Last run</span>
      <time dateTime={checkedAt} className="text-foreground font-mono">
        {formatRunAt(new Date(checkedAt))}
      </time>
      <span title="DKIM, SPF, DMARC and MX are looked up on every run; the SPF tree, MTA-STS, TLS-RPT, BIMI, A and NS answers are reused for up to 5 minutes.">
        · live DNS, some answers cached up to 5 min
      </span>
    </p>
  )
}
