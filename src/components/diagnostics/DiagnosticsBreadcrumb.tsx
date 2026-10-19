import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import type { DiagnosticsBreadcrumbProps } from './DiagnosticsBreadcrumbProps'

/** Domains > domain > Diagnostics, so the domain detail is one click away. */
export function DiagnosticsBreadcrumb({
  domain,
}: Readonly<DiagnosticsBreadcrumbProps>) {
  const link =
    'hover:text-foreground focus-visible:ring-ring rounded transition-colors focus-visible:ring-2 focus-visible:outline-none'
  return (
    <nav
      aria-label="Breadcrumb"
      className="text-muted-foreground flex min-w-0 flex-wrap items-center gap-1.5 text-xs print:hidden"
    >
      <Link href="/domains" className={link}>
        Domains
      </Link>
      <ChevronRight aria-hidden className="h-3 w-3 shrink-0" />
      <Link
        href={`/domains/${encodeURIComponent(domain)}`}
        className={`${link} font-mono`}
      >
        {domain}
      </Link>
      <ChevronRight aria-hidden className="h-3 w-3 shrink-0" />
      <span aria-current="page" className="text-foreground">
        Diagnostics
      </span>
    </nav>
  )
}
