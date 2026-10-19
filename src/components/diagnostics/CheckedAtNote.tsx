import { formatRunAt } from '@/utils/format'
import { CalendarClock } from 'lucide-react'
import type { CheckedAtNoteProps } from './CheckedAtNoteProps'

/** When the lookups ran; the title says which answers may be older. */
export function CheckedAtNote({ checkedAt }: Readonly<CheckedAtNoteProps>) {
  return (
    <p
      title="DKIM, SPF, DMARC and MX are looked up on every run; the SPF tree, MTA-STS, TLS-RPT, BIMI, A and NS answers are reused for up to 5 minutes."
      className="border-border bg-card text-muted-foreground inline-flex h-9 items-center gap-2 rounded-md border px-3 text-xs"
    >
      <CalendarClock aria-hidden className="h-4 w-4 shrink-0" />
      <span>Last run:</span>
      <time dateTime={checkedAt} className="text-foreground font-mono">
        {formatRunAt(new Date(checkedAt))}
      </time>
    </p>
  )
}
