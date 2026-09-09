import Link from 'next/link'
import type { ReportHeaderOtherDomainsProps } from './ReportHeaderOtherDomainsProps'

/** Chips for the domains beyond the first; nothing when there are none. */
export function ReportHeaderOtherDomains({
  domains,
}: Readonly<ReportHeaderOtherDomainsProps>) {
  if (domains.length === 0) return null

  return (
    <div className="flex flex-wrap items-center gap-2 pt-1">
      <span className="text-muted-foreground text-xs">Also covers</span>
      {domains.map((d) => (
        <Link
          key={d.domainId}
          href={`/domains/${encodeURIComponent(d.domainName)}`}
          className="border-border bg-card text-foreground hover:border-primary/40 hover:text-primary rounded-full border px-2.5 py-0.5 text-xs font-medium transition"
        >
          {d.domainName}
        </Link>
      ))}
    </div>
  )
}
