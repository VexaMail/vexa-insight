'use client'

import { useVolumeByOrgTable } from '@/hooks/dashboard'
import { RankedListCard } from './RankedListCard'
import { RankedListEmpty } from './RankedListEmpty'
import { VolumeByOrgRow } from './VolumeByOrgRow'
import { VolumeByOrgSkeleton } from './VolumeByOrgSkeleton'

export default function VolumeByOrgTable() {
  const { maxCount, rows, isLoading } = useVolumeByOrgTable()

  return (
    <RankedListCard title="Volume by Reporting Organization">
      {isLoading ? <VolumeByOrgSkeleton /> : null}
      {!isLoading && rows.length === 0 && (
        <RankedListEmpty message="No reporting orgs yet. Ingest DMARC reports to see volume by org." />
      )}
      {!isLoading && rows.length > 0 && (
        <div className="space-y-3">
          {rows.slice(0, 15).map((r) => (
            <VolumeByOrgRow key={r.orgName} row={r} maxCount={maxCount} />
          ))}
        </div>
      )}
    </RankedListCard>
  )
}
