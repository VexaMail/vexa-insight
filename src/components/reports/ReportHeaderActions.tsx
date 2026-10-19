import { Button } from '@/components/ui'
import type { ReportHeaderActionsProps } from '@/types/reports'
import { Globe, Stethoscope } from 'lucide-react'
import Link from 'next/link'

/** Where to go next from a report: the domain and its live DNS checks. */
export function ReportHeaderActions({
  domain,
}: Readonly<ReportHeaderActionsProps>) {
  const encoded = encodeURIComponent(domain)
  return (
    <>
      <Button asChild variant="outline" size="sm" className="min-h-10">
        <Link href={`/domains/${encoded}`}>
          <Globe className="h-4 w-4" aria-hidden="true" />
          Domain overview
        </Link>
      </Button>
      <Button asChild variant="outline" size="sm" className="min-h-10">
        <Link href={`/diagnostics/${encoded}`}>
          <Stethoscope className="h-4 w-4" aria-hidden="true" />
          DNS diagnostics
        </Link>
      </Button>
    </>
  )
}
