import { DOMAIN_RANK_GRID } from '@/constants/dashboard'
import { cn } from '@/lib/utils'
import {
  dmarcPassRate,
  domainHref,
  formatCount,
  formatRate,
  passRateTextClassName,
} from '@/utils/dashboard'
import Link from 'next/link'
import type { DomainRankRowProps } from './DomainRankRowProps'
import { RankTrend } from './RankTrend'

/** Domain, messages, pass and fail rate and trend, linking to the domain. */
export function DomainRankRow({ domain, trend }: Readonly<DomainRankRowProps>) {
  const rate = dmarcPassRate(domain.current) ?? 0
  return (
    <li>
      <Link
        href={domainHref(domain.domainName)}
        className={cn(
          'hover:bg-accent/60 focus-visible:ring-ring grid min-h-10 items-center gap-3 px-4 py-2 font-mono text-[13px] tabular-nums transition-colors focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset',
          DOMAIN_RANK_GRID,
        )}
      >
        <span className="text-info truncate">{domain.domainName}</span>
        <span className="text-foreground text-right">
          {formatCount(domain.current.total)}
        </span>
        <span className={cn('text-right', passRateTextClassName(rate))}>
          {formatRate(rate)}
        </span>
        <span className="text-danger hidden text-right sm:block">
          {formatRate(100 - rate)}
        </span>
        <RankTrend
          values={trend}
          label={`Daily fail rate of ${domain.domainName}`}
        />
      </Link>
    </li>
  )
}
