import { StatusPill } from '@/components/ui'
import Link from 'next/link'
import { FAILING_KIND_LABEL } from './failingKindLabel'
import { FAILING_KIND_TONE } from './failingKindTone'
import type { FailingSourceRowProps } from './FailingSourceRowProps'

/** One failing source: where it is, who it is and how it is read. */
export function FailingSourceRow({ source }: Readonly<FailingSourceRowProps>) {
  return (
    <tr>
      <td className="px-3 py-2">
        <Link
          href={`/ips/${encodeURIComponent(source.sourceIp)}`}
          className="text-info hover:text-primary font-mono"
        >
          {source.sourceIp}
        </Link>
        {source.hostname ? (
          <span className="text-muted-foreground block text-xs whitespace-nowrap">
            {source.hostname}
          </span>
        ) : null}
      </td>
      <td className="text-foreground px-3 py-2">
        {source.sender?.name ?? 'Unknown'}
      </td>
      <td className="px-3 py-2">
        <StatusPill tone={FAILING_KIND_TONE[source.kind]}>
          {FAILING_KIND_LABEL[source.kind]}
        </StatusPill>
      </td>
      <td className="text-foreground px-3 py-2 text-right font-mono tabular-nums">
        {source.failingMessages.toLocaleString('en-US')}
      </td>
      <td className="text-foreground px-3 py-2 text-right font-mono tabular-nums">
        {(source.passRate * 100).toFixed(0)}%
      </td>
    </tr>
  )
}
