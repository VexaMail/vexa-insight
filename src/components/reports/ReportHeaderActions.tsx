import { Button } from '@/components/ui'
import type { ReportHeaderActionsProps } from '@/types/reports'
import { ArrowRight, Globe, Stethoscope } from 'lucide-react'
import Link from 'next/link'

/** Where to go next from a report: the domain, then its live DNS checks. */
export function ReportHeaderActions({
  domain,
}: Readonly<ReportHeaderActionsProps>) {
  const encoded = encodeURIComponent(domain)
  return (
    <>
      <Button asChild variant="outline" className="h-10">
        <Link href={`/diagnostics/${encoded}`}>
          <Stethoscope aria-hidden="true" />
          DNS diagnostics
          <ArrowRight aria-hidden="true" />
        </Link>
      </Button>
      <Button asChild className="h-10">
        <Link href={`/domains/${encoded}`}>
          <Globe aria-hidden="true" />
          Open domain
        </Link>
      </Button>
    </>
  )
}
