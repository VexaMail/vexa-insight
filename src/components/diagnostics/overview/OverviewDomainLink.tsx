import Link from 'next/link'
import type { DiagnosticsOverviewRowProps } from './DiagnosticsOverviewRowProps'

export function OverviewDomainLink({
  row,
}: Readonly<DiagnosticsOverviewRowProps>) {
  return (
    <Link
      href={`/diagnostics/${encodeURIComponent(row.domainName)}`}
      className="text-foreground hover:text-primary focus-visible:ring-ring rounded font-mono text-sm font-medium break-all transition-colors focus-visible:ring-2 focus-visible:outline-none md:break-normal md:whitespace-nowrap"
    >
      {row.domainName}
    </Link>
  )
}
