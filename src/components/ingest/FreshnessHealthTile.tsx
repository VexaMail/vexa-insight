import type { IngestHealthProps } from '@/types/ingest'
import { describeAge, formatHealthTime, freshnessVerdict } from '@/utils/ingest'
import { Hourglass } from 'lucide-react'
import Link from 'next/link'
import { HealthFact } from './HealthFact'
import { HealthTile } from './HealthTile'

/** How old the newest report is: by arrival, and by the period it covers. */
export function FreshnessHealthTile({ health }: Readonly<IngestHealthProps>) {
  const { reports, now } = health
  return (
    <HealthTile
      title="Data freshness"
      icon={<Hourglass />}
      verdict={freshnessVerdict(reports, now)}
    >
      <HealthFact
        label="Last report parsed"
        title={formatHealthTime(reports.lastIngestedAt)}
      >
        {describeAge(reports.lastIngestedAt, now)}
      </HealthFact>
      <HealthFact
        label="Newest period ends"
        title={formatHealthTime(reports.lastPeriodEnd)}
      >
        {describeAge(reports.lastPeriodEnd, now)}
      </HealthFact>
      <div className="pt-1">
        <Link
          href="/reports"
          className="text-primary text-xs font-medium hover:underline"
        >
          Latest reports
        </Link>
      </div>
    </HealthTile>
  )
}
