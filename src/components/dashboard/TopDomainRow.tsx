import {
  passRateBarClassName,
  passRateTextClassName,
  sharePercent,
} from '@/utils/dashboard'
import Link from 'next/link'
import { ShareBar } from './ShareBar'
import type { TopDomainRowProps } from './TopDomainRowProps'

/** One domain of the top-domains list, linking to its detail page. */
export function TopDomainRow({ domain, maxMessages }: TopDomainRowProps) {
  return (
    <Link
      href={`/domains/${domain.domainName}`}
      className="-mx-3 block space-y-1.5 rounded-lg p-3 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
    >
      <div className="flex items-center justify-between text-xs">
        <span className="text-foreground font-medium">{domain.domainName}</span>
        <div className="flex items-center gap-3">
          <span className="text-muted-foreground">
            {domain.totalMessages.toLocaleString()} msgs
          </span>
          <span
            className={`font-semibold ${passRateTextClassName(domain.passRatePercent)}`}
          >
            {domain.passRatePercent.toFixed(1)}%
          </span>
        </div>
      </div>
      <ShareBar
        percent={sharePercent(domain.totalMessages, maxMessages)}
        className={passRateBarClassName(domain.passRatePercent)}
      />
    </Link>
  )
}
