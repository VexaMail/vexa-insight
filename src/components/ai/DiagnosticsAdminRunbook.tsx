'use client'

import { DiagnosticsAdminGuideCard } from './DiagnosticsAdminGuideCard'
import type { DiagnosticsAdminRunbookProps } from './DiagnosticsAdminRunbookProps'
import { RunbookEmptyNotice } from './RunbookEmptyNotice'
import { RunbookHeading } from './RunbookHeading'
import { RunbookStatCard } from './RunbookStatCard'

export function DiagnosticsAdminRunbook({
  domainName,
  score,
  stats,
  guides,
}: Readonly<DiagnosticsAdminRunbookProps>) {
  const failureRate =
    stats.totalEvents > 0
      ? ((stats.failedEvents / stats.totalEvents) * 100).toFixed(1)
      : '0.0'

  return (
    <section className="bg-card space-y-4 rounded-xl border p-5 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <RunbookHeading domainName={domainName} />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <RunbookStatCard label="Score">
            {score.percentage}% ({score.grade})
          </RunbookStatCard>
          <RunbookStatCard label="Total Events">
            {stats.totalEvents}
          </RunbookStatCard>
          <RunbookStatCard label="Failed">{stats.failedEvents}</RunbookStatCard>
          <RunbookStatCard label="Failure Rate">{failureRate}%</RunbookStatCard>
        </div>
      </div>

      {guides.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          {guides.map((guide) => (
            <DiagnosticsAdminGuideCard key={guide.id} guide={guide} />
          ))}
        </div>
      ) : (
        <RunbookEmptyNotice />
      )}
    </section>
  )
}
