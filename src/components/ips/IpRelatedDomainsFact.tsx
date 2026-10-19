import type { IpRelatedDomainsFactProps } from '@/types/ips'
import Link from 'next/link'

/** The busiest related domain, linked, and how many more there are. */
export function IpRelatedDomainsFact({
  domains,
  href,
}: Readonly<IpRelatedDomainsFactProps>) {
  const first = domains?.[0]
  if (!first) return <span className="text-muted-foreground">None</span>
  const more = domains.length - 1
  return (
    <span className="flex min-w-0 items-center gap-1.5">
      <Link
        href={`/domains/${encodeURIComponent(first.domain)}`}
        className="hover:text-primary truncate transition-colors duration-150"
      >
        {first.domain}
      </Link>
      {more > 0 ? (
        <Link
          href={href}
          scroll={false}
          className="text-muted-foreground hover:text-foreground shrink-0 text-xs"
        >
          +{more}
        </Link>
      ) : null}
    </span>
  )
}
