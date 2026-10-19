import { IpFlag } from '@/components/ips'
import { FAILING_SOURCE_GRID } from '@/constants/dashboard'
import { cn } from '@/lib/utils'
import { formatCount, formatRate, sourceHref } from '@/utils/dashboard'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import type { FailingSourceRowProps } from './FailingSourceRowProps'
import { RankTrend } from './RankTrend'

/** Source, the domain it fails most for, messages, fail rate and trend. */
export function FailingSourceRow({
  source,
  trend,
}: Readonly<FailingSourceRowProps>) {
  const failRate =
    source.total > 0 ? (source.failed / source.total) * 100 : null
  const others = source.domainCount - 1
  return (
    <li>
      <Link
        href={sourceHref(source.ip)}
        title={`${formatCount(source.failed)} of ${formatCount(source.total)} messages fail DMARC`}
        className={cn(
          'hover:bg-accent/60 focus-visible:ring-ring grid min-h-10 items-center gap-3 px-4 py-2 font-mono text-[13px] tabular-nums transition-colors focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset',
          FAILING_SOURCE_GRID,
        )}
      >
        <span className="flex min-w-0 items-center gap-2">
          <IpFlag countryCode={source.countryCode} countryName={null} />
          <span className="text-info truncate">{source.ip}</span>
        </span>
        <span className="text-muted-foreground hidden truncate sm:block">
          {source.exampleDomain}
          {others > 0 ? ` +${String(others)}` : ''}
        </span>
        <span className="text-foreground text-right">
          {formatCount(source.total)}
        </span>
        <span className="text-danger text-right">{formatRate(failRate)}</span>
        <RankTrend values={trend} label={`Daily failures from ${source.ip}`} />
        <ChevronRight aria-hidden className="text-muted-foreground h-4 w-4" />
      </Link>
    </li>
  )
}
