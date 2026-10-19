import { EmptyState } from '@/components/ui'

/** Shown while no mailbox is configured: ingestion has nothing to read. */
export function ImapAccountsEmpty() {
  return (
    <EmptyState className="bg-secondary p-6">
      <p className="text-foreground font-medium">No mailbox configured</p>
      <p className="mt-1 text-xs">
        Add the IMAP account your DMARC <code className="font-mono">rua</code>{' '}
        address delivers to, or upload report files by hand.
      </p>
    </EmptyState>
  )
}
