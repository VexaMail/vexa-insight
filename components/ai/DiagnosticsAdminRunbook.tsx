'use client'

import { DiagnosticsAdminGuideCard } from './DiagnosticsAdminGuideCard'
import type { DiagnosticsAdminRunbookProps } from './DiagnosticsAdminRunbookProps'

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
        <div className="space-y-1">
          <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
            Admin Runbook
          </p>
          <h3 className="text-foreground text-base font-semibold">
            What to review in {domainName} and how to fix it
          </h3>
          <p className="text-muted-foreground text-sm">
            Operational guidance based on live DNS and historical telemetry so
            an admin can identify the cause and fix it, not just read a summary.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="bg-background rounded-lg border px-3 py-2">
            <p className="text-muted-foreground text-[11px] font-semibold tracking-wide uppercase">
              Score
            </p>
            <p className="text-foreground text-lg font-bold">
              {score.percentage}% ({score.grade})
            </p>
          </div>
          <div className="bg-background rounded-lg border px-3 py-2">
            <p className="text-muted-foreground text-[11px] font-semibold tracking-wide uppercase">
              Total Events
            </p>
            <p className="text-foreground text-lg font-bold">
              {stats.totalEvents}
            </p>
          </div>
          <div className="bg-background rounded-lg border px-3 py-2">
            <p className="text-muted-foreground text-[11px] font-semibold tracking-wide uppercase">
              Failed
            </p>
            <p className="text-foreground text-lg font-bold">
              {stats.failedEvents}
            </p>
          </div>
          <div className="bg-background rounded-lg border px-3 py-2">
            <p className="text-muted-foreground text-[11px] font-semibold tracking-wide uppercase">
              Failure Rate
            </p>
            <p className="text-foreground text-lg font-bold">{failureRate}%</p>
          </div>
        </div>
      </div>

      {guides.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          {guides.map((guide) => (
            <DiagnosticsAdminGuideCard key={guide.id} guide={guide} />
          ))}
        </div>
      ) : (
        <div className="text-muted-foreground rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4 text-sm">
          No high-priority structural issues were detected in DNS or historical
          telemetry. If you still see delivery problems, use the AI analysis to
          look for subtler anomalies in organizations, forwarding, or partial
          alignment.
        </div>
      )}
    </section>
  )
}
