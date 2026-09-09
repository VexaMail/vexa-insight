'use client'

import { useLatestReportsTable } from '@/hooks/dashboard'
import { LatestReportRow } from './LatestReportRow'
import { LatestReportsSkeleton } from './LatestReportsSkeleton'
import { RankedListCard } from './RankedListCard'
import { RankedListEmpty } from './RankedListEmpty'

export default function LatestReportsTable() {
  const { reports, isLoading } = useLatestReportsTable()

  return (
    <RankedListCard title="Latest Reports">
      {isLoading ? <LatestReportsSkeleton /> : null}
      {!isLoading && reports.length === 0 && (
        <RankedListEmpty message="No reports yet. Upload or ingest DMARC reports." />
      )}
      {!isLoading && reports.length > 0 && (
        <div className="space-y-2.5">
          {reports.slice(0, 15).map((r) => (
            <LatestReportRow key={r.id} report={r} />
          ))}
        </div>
      )}
    </RankedListCard>
  )
}
