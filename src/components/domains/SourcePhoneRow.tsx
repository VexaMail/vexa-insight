import { IpFlag } from '@/components/ips'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { SourceAuthPills } from './SourceAuthPills'
import type { SourcePhoneRowProps } from './SourcePhoneRowProps'

/** One source as a phone summary: IP, host, volume and the five facts. */
export function SourcePhoneRow({ row }: Readonly<SourcePhoneRowProps>) {
  return (
    <li>
      <Link
        href={`/ips/${encodeURIComponent(row.sourceIp)}`}
        className="hover:bg-accent flex min-h-11 items-center gap-3 px-4 py-3 transition-colors duration-150"
      >
        <span className="min-w-0 flex-1 space-y-1.5">
          <span className="flex items-center gap-2">
            <IpFlag
              countryCode={row.countryCode ?? null}
              countryName={row.countryName ?? null}
            />
            <span className="text-info min-w-0 truncate font-mono text-sm">
              {row.sourceIp}
            </span>
            <span className="text-foreground ml-auto font-mono text-sm tabular-nums">
              {row.count.toLocaleString('en-US')}
            </span>
          </span>
          <span className="text-muted-foreground block truncate text-xs">
            {row.sender?.name ?? row.hostname ?? 'No reverse DNS'}
          </span>
          <SourceAuthPills auth={row.auth} />
        </span>
        <ChevronRight
          className="text-muted-foreground h-4 w-4 shrink-0"
          aria-hidden
        />
      </Link>
    </li>
  )
}
