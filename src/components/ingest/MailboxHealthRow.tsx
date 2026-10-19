import { STATUS_TONE_DOT_CLASSES } from '@/constants/ui'
import { cn } from '@/lib/utils'
import type { MailboxHealthRowProps } from '@/types/ingest'
import { describeAge, formatHealthTime, mailboxVerdict } from '@/utils/ingest'

/** One mailbox: its name, last clean poll and, when newer, its last error. */
export function MailboxHealthRow({
  mailbox,
  now,
}: Readonly<MailboxHealthRowProps>) {
  const verdict = mailboxVerdict(mailbox)
  return (
    <div className="space-y-0.5">
      <div className="flex items-center justify-between gap-2">
        <dt className="text-foreground flex min-w-0 items-center gap-1.5 text-xs font-medium">
          <span
            aria-hidden
            className={cn(
              'h-1.5 w-1.5 shrink-0 rounded-full',
              STATUS_TONE_DOT_CLASSES[verdict.tone],
            )}
          />
          <span className="truncate">{mailbox.name}</span>
        </dt>
        <dd
          className="text-muted-foreground shrink-0 font-mono text-xs"
          title={formatHealthTime(mailbox.lastSuccessAt)}
        >
          ok {describeAge(mailbox.lastSuccessAt, now)}
        </dd>
      </div>
      {verdict.tone === 'danger' && mailbox.lastError ? (
        <dd
          className="text-danger truncate font-mono text-[11px]"
          title={mailbox.lastError}
        >
          {describeAge(mailbox.lastErrorAt, now)}: {mailbox.lastError}
        </dd>
      ) : null}
    </div>
  )
}
