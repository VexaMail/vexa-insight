import {
  dmarcPassRate,
  domainHref,
  formatCount,
  formatRate,
  passRateBarClassName,
  passRateTextClassName,
} from '@/utils/dashboard'
import Link from 'next/link'
import type { DomainRankRowProps } from './DomainRankRowProps'
import { RateBar } from './RateBar'

/** Domain, messages and DMARC pass rate, linking to the domain page. */
export function DomainRankRow({ domain }: Readonly<DomainRankRowProps>) {
  const rate = dmarcPassRate(domain.current) ?? 0
  return (
    <li>
      <Link
        href={domainHref(domain.domainName)}
        className="hover:bg-accent/60 focus-visible:ring-ring grid min-h-10 grid-cols-[minmax(0,1fr)_72px_minmax(88px,0.8fr)] items-center gap-3 px-4 py-2 transition-colors focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset"
      >
        <span className="text-foreground truncate font-mono text-[13px]">
          {domain.domainName}
        </span>
        <span className="text-foreground text-right font-mono text-[13px] tabular-nums">
          {formatCount(domain.current.total)}
        </span>
        <span className="flex items-center gap-2">
          <span
            className={`w-12 shrink-0 text-right font-mono text-[13px] tabular-nums ${passRateTextClassName(rate)}`}
          >
            {formatRate(rate)}
          </span>
          <RateBar rate={rate} barClassName={passRateBarClassName(rate)} />
        </span>
      </Link>
    </li>
  )
}
