import { IpFlag } from '@/components/ips'
import { formatCount, formatRate, sourceHref } from '@/utils/dashboard'
import Link from 'next/link'
import type { FailingSourceRowProps } from './FailingSourceRowProps'

/** IP, the domain it fails most for, fail rate and failing messages. */
export function FailingSourceRow({ source }: Readonly<FailingSourceRowProps>) {
  const failRate =
    source.total > 0 ? (source.failed / source.total) * 100 : null
  const others = source.domainCount - 1
  return (
    <li>
      <Link
        href={sourceHref(source.ip)}
        className="hover:bg-accent/60 focus-visible:ring-ring grid min-h-10 grid-cols-[minmax(0,1fr)_64px_auto] items-center gap-3 px-4 py-2 transition-colors focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset"
      >
        <span className="flex min-w-0 items-center gap-2">
          <IpFlag countryCode={source.countryCode} countryName={null} />
          <span className="min-w-0">
            <span className="text-info block truncate font-mono text-[13px]">
              {source.ip}
            </span>
            <span className="text-muted-foreground block truncate text-xs">
              {source.exampleDomain}
              {others > 0 ? ` +${String(others)}` : ''}
            </span>
          </span>
        </span>
        <span className="text-danger text-right font-mono text-[13px] tabular-nums">
          {formatRate(failRate)}
        </span>
        <span className="text-foreground font-mono text-[13px] tabular-nums">
          {formatCount(source.failed)}
          <span className="text-muted-foreground">
            {' '}
            / {formatCount(source.total)}
          </span>
        </span>
      </Link>
    </li>
  )
}
