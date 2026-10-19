'use client'

import type { ReportsCardListProps } from '@/types/reports'
import { ReportCard } from './ReportCard'

/** Phone and tablet view of the reports list: one summary per report. */
export function ReportsCardList({
  rows,
  domainName,
}: Readonly<ReportsCardListProps>) {
  const scopeIds = rows.map((r) => r.id.toString())
  return (
    <ul className="glass-card divide-border divide-y xl:hidden">
      {rows.map((row) => (
        <ReportCard
          key={row.id}
          row={row}
          domainName={domainName}
          scopeIds={scopeIds}
        />
      ))}
    </ul>
  )
}
