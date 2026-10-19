import { IpFlag } from '@/components/ips'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { SourceAuthPills } from './SourceAuthPills'
import type { SourcePhoneRowProps } from './SourcePhoneRowProps'

/**
 * One source as a phone summary: IP, host, volume and the five facts. The IP
 * link stretches over the row; the badges sit above it, so a tap on a badge
 * opens its result and a tap anywhere else opens the source.
 */
export function SourcePhoneRow({ row }: Readonly<SourcePhoneRowProps>) {
  return (
    <li className="hover:bg-accent relative flex min-h-11 items-center gap-3 px-4 py-3 transition-colors duration-150">
      <span className="min-w-0 flex-1 space-y-1.5">
        <span className="flex items-center gap-2">
          <IpFlag
            countryCode={row.countryCode ?? null}
            countryName={row.countryName ?? null}
          />
          <Link
            href={`/ips/${encodeURIComponent(row.sourceIp)}`}
            className="text-info focus-visible:ring-ring min-w-0 truncate font-mono text-sm after:absolute after:inset-0 focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset"
          >
            {row.sourceIp}
          </Link>
          <span className="text-foreground ml-auto font-mono text-sm tabular-nums">
            {row.count.toLocaleString('en-US')}
          </span>
        </span>
        <span className="text-muted-foreground block truncate text-xs">
          {row.sender?.name ?? row.hostname ?? 'No reverse DNS'}
        </span>
        <span className="relative z-10 block w-fit">
          <SourceAuthPills auth={row.auth} />
        </span>
      </span>
      <ChevronRight
        className="text-muted-foreground h-4 w-4 shrink-0"
        aria-hidden
      />
    </li>
  )
}
