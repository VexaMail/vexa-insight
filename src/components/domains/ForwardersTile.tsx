import { Users } from 'lucide-react'
import { DecisionTile } from './DecisionTile'
import type { ForwardersTileProps } from './ForwardersTileProps'
import { TileLinkButton } from './TileLinkButton'

/** Failing mail relayed by mailing lists and mailbox providers. */
export function ForwardersTile({
  readiness,
  reviewHref,
}: Readonly<ForwardersTileProps>) {
  const sources = readiness.failingSourcesByKind.forwarded
  return (
    <DecisionTile
      icon={<Users />}
      title="Forwarders / mailing lists"
      href={reviewHref}
    >
      <p className="flex items-baseline gap-2.5">
        <span className="text-foreground font-mono text-3xl leading-tight font-semibold tabular-nums">
          {sources.toLocaleString('en-US')}
        </span>
        <span className="text-muted-foreground text-xs">
          sources, {readiness.failingByKind.forwarded.toLocaleString('en-US')}{' '}
          failing messages, last {readiness.days} days
        </span>
      </p>
      <p className="text-muted-foreground text-sm">
        These sources appear to forward or relay mail. Forwarding breaks SPF;
        DKIM survives unless the list rewrites the message.
      </p>
      <TileLinkButton href={reviewHref} className="mt-auto">
        View sources
      </TileLinkButton>
    </DecisionTile>
  )
}
