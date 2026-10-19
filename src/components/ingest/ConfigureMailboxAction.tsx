import { Button } from '@/components/ui'
import { MAILBOX_SETTINGS_HREF } from '@/constants/ingest'
import type { ConfigureMailboxActionProps } from '@/types/ingest'
import { Inbox } from 'lucide-react'
import Link from 'next/link'

/**
 * Stands in for Trigger now while no mailbox exists: a run would fetch
 * nothing, so the one useful step is adding a mailbox in Settings.
 */
export function ConfigureMailboxAction({
  canConfigure,
}: Readonly<ConfigureMailboxActionProps>) {
  if (!canConfigure) {
    return (
      <p className="border-border bg-secondary/40 text-muted-foreground rounded-md border px-3 py-2.5 text-xs">
        No mailbox is configured, so nothing is fetched. An admin adds one in
        Settings.
      </p>
    )
  }
  return (
    <div className="flex flex-col gap-2">
      <Button asChild className="h-10 w-full">
        <Link href={MAILBOX_SETTINGS_HREF}>
          <Inbox aria-hidden="true" />
          Configure mailbox
        </Link>
      </Button>
      <p className="text-muted-foreground text-xs">
        A run needs at least one IMAP mailbox; until then reports arrive only by
        upload or the API.
      </p>
    </div>
  )
}
