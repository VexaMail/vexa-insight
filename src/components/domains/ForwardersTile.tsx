import { ChevronRight, MailWarning, Users } from 'lucide-react'
import Link from 'next/link'
import { DecisionTile } from './DecisionTile'
import type { ForwardersTileProps } from './ForwardersTileProps'

/** Failing mail relayed by mailing lists and mailbox providers. */
export function ForwardersTile({
  readiness,
  reviewHref,
}: Readonly<ForwardersTileProps>) {
  const sources = readiness.failingSourcesByKind.forwarded
  return (
    <DecisionTile icon={<Users />} title="Forwarders / mailing lists">
      <div>
        <p className="text-foreground font-mono text-3xl leading-tight font-semibold tabular-nums">
          {sources.toLocaleString('en-US')}
        </p>
        <p className="text-muted-foreground text-xs">
          sources relayed{' '}
          {readiness.failingByKind.forwarded.toLocaleString('en-US')} failing
          messages, last {readiness.days} days
        </p>
      </div>
      <p className="text-muted-foreground text-sm">
        Forwarding breaks SPF; DKIM survives unless the list rewrites the
        message. Not proof the original sender was legitimate.
      </p>
      <div className="mt-auto flex items-end justify-between gap-2">
        {sources > 0 ? (
          <Link
            href={reviewHref}
            className="text-primary inline-flex min-h-10 items-center gap-1 text-sm font-medium whitespace-nowrap underline-offset-2 hover:underline"
          >
            Show forwarders <ChevronRight className="h-4 w-4" aria-hidden />
          </Link>
        ) : (
          <span />
        )}
        <MailWarning
          className="text-muted-foreground/40 h-8 w-8 shrink-0"
          strokeWidth={1.25}
          aria-hidden
        />
      </div>
    </DecisionTile>
  )
}
