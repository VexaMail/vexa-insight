'use client'

import { useRelativeAge } from '@/hooks/diagnostics'
import { formatRunAt } from '@/utils/format'
import { Clock } from 'lucide-react'
import type { CheckedAtNoteProps } from './CheckedAtNoteProps'

/** When the lookups ran and how long ago; the title says what is cached. */
export function CheckedAtNote({ checkedAt }: Readonly<CheckedAtNoteProps>) {
  const age = useRelativeAge(checkedAt)
  return (
    <div
      title="DKIM, SPF, DMARC and MX are looked up on every run; the SPF tree, MTA-STS, TLS-RPT, BIMI, A and NS answers are reused for up to 5 minutes."
      className="flex items-center gap-2.5"
    >
      <Clock aria-hidden className="text-muted-foreground h-5 w-5 shrink-0" />
      <div className="text-xs leading-tight">
        <p className="text-muted-foreground">Last run</p>
        <time
          dateTime={checkedAt}
          className="text-foreground block font-mono text-[13px]"
        >
          {formatRunAt(new Date(checkedAt))}
        </time>
        <p className="text-muted-foreground" suppressHydrationWarning>
          {age}
        </p>
      </div>
    </div>
  )
}
