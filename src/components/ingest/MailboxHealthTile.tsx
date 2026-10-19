import { MAILBOX_SETTINGS_HREF } from '@/constants/ingest'
import type { IngestHealthProps } from '@/types/ingest'
import { mailboxesVerdict } from '@/utils/ingest'
import { Inbox } from 'lucide-react'
import Link from 'next/link'
import { HealthTile } from './HealthTile'
import { MailboxHealthRow } from './MailboxHealthRow'

/** Each IMAP mailbox: when it last polled cleanly and its last error. */
export function MailboxHealthTile({ health }: Readonly<IngestHealthProps>) {
  return (
    <HealthTile
      title="Mailbox connectivity"
      icon={<Inbox />}
      verdict={mailboxesVerdict(health.mailboxes)}
    >
      {health.mailboxes.length === 0 ? (
        <p className="text-muted-foreground text-xs">
          Nothing is polled until an IMAP mailbox is added.{' '}
          <Link
            href={MAILBOX_SETTINGS_HREF}
            className="text-primary font-medium hover:underline"
          >
            Add one in Settings
          </Link>
        </p>
      ) : (
        health.mailboxes.map((mailbox) => (
          <MailboxHealthRow
            key={mailbox.id}
            mailbox={mailbox}
            now={health.now}
          />
        ))
      )}
    </HealthTile>
  )
}
