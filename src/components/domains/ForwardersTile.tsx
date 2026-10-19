import { Users } from 'lucide-react'
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
      <p className="text-foreground font-mono text-3xl font-semibold tabular-nums">
        {sources.toLocaleString('en-US')}
      </p>
      <p className="text-muted-foreground text-xs">
        sources relayed{' '}
        {readiness.failingByKind.forwarded.toLocaleString('en-US')} failing
        messages, last {readiness.days} days
      </p>
      <p className="text-muted-foreground text-sm">
        Forwarding breaks SPF; DKIM survives unless the list rewrites the
        message. This is a reading of the relay, not proof the original sender
        was legitimate.
      </p>
      {sources > 0 ? (
        <Link
          href={reviewHref}
          className="text-primary mt-auto text-sm font-medium underline-offset-2 hover:underline"
        >
          Show forwarders
        </Link>
      ) : null}
    </DecisionTile>
  )
}
