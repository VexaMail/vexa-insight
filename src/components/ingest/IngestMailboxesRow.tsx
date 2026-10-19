import { StatusPill } from '@/components/ui'
import { MAILBOX_SETTINGS_HREF } from '@/constants/ingest'
import type { IngestHealthFactsProps } from '@/types/ingest'
import { countReachableMailboxes, mailboxesVerdict } from '@/utils/ingest'
import Link from 'next/link'
import { IngestFactRow } from './IngestFactRow'

/** The mailboxes configured right now, and where to add one when none is. */
export function IngestMailboxesRow({
  health,
  canConfigure = false,
}: Readonly<Omit<IngestHealthFactsProps, 'activity'>>) {
  const { mailboxes } = health
  const verdict = mailboxesVerdict(mailboxes)
  const settingsLink = canConfigure ? (
    <Link
      href={MAILBOX_SETTINGS_HREF}
      className="text-primary font-medium hover:underline"
    >
      Add one in Settings
    </Link>
  ) : (
    'An admin adds one in Settings'
  )
  return (
    <IngestFactRow
      label="Mailboxes"
      aside={mailboxes.length === 0 ? settingsLink : undefined}
    >
      {mailboxes.length > 0 ? (
        <span className="tabular-nums">
          {`${String(countReachableMailboxes(mailboxes))} of ${String(mailboxes.length)} reachable`}
        </span>
      ) : null}
      <StatusPill tone={verdict.tone} dot>
        {verdict.label}
      </StatusPill>
    </IngestFactRow>
  )
}
