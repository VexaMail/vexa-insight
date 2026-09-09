'use client'

import { useDiagnosticsSections, useDiagnosticsView } from '@/hooks/diagnostics'
import { DiagnosticsDetailSections } from './DiagnosticsDetailSections'
import { DiagnosticsHeader } from './DiagnosticsHeader'
import type { DiagnosticsViewProps } from './DiagnosticsViewProps'
import { ProtocolOverviewPanel } from './overview/ProtocolOverviewPanel'
import { DomainScoreBadge } from './score/DomainScoreBadge'

export function DiagnosticsView({
  domains,
  currentDomainName,
  days,
  fromDate,
  toDate,
  dns,
  score,
}: Readonly<DiagnosticsViewProps>) {
  const { handleDomainChange } = useDiagnosticsView()
  const { getSectionProps, openSection } = useDiagnosticsSections()

  return (
    <div className="flex flex-col space-y-6">
      <DiagnosticsHeader
        domains={domains}
        currentDomainName={currentDomainName}
        days={days}
        fromDate={fromDate}
        toDate={toDate}
        onDomainChange={handleDomainChange}
      />

      {/* Hero: Score & Protocol Overview */}
      <div className="flex flex-col gap-6">
        <DomainScoreBadge score={score} domain={currentDomainName} />
        <ProtocolOverviewPanel dns={dns} onOpenSection={openSection} />
      </div>

      <DiagnosticsDetailSections dns={dns} getSectionProps={getSectionProps} />
    </div>
  )
}
