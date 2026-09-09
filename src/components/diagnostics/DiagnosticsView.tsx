'use client'

import { DateRangeFilter } from '@/components/filters'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui'

import { useDiagnosticsSections, useDiagnosticsView } from '@/hooks/diagnostics'
import type { DiagnosticsViewProps } from './DiagnosticsViewProps'
import { ExportPdfButton } from './ExportPdfButton'
import { BimiDetailSection } from './bimi/BimiDetailSection'
import { DkimDetailSection } from './dkim/DkimDetailSection'
import { DmarcDetailSection } from './dmarc/DmarcDetailSection'
import { DnsRecordsSection } from './dns/DnsRecordsSection'
import { MtaStsDetailSection } from './mtasts/MtaStsDetailSection'
import { ProtocolOverviewPanel } from './overview/ProtocolOverviewPanel'
import { DomainScoreBadge } from './score/DomainScoreBadge'
import { SpfDetailSection } from './spf/SpfDetailSection'
import { SpfLookupTreeSection } from './spf/SpfLookupTreeSection'
import { TlsRptDetailSection } from './tlsrpt/TlsRptDetailSection'

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
      {/* Header and Filters */}
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-display text-foreground text-2xl font-bold tracking-tight">
          Diagnostics
        </h1>

        <div className="flex flex-wrap items-center gap-4 print:hidden">
          <Select value={currentDomainName} onValueChange={handleDomainChange}>
            <SelectTrigger className="bg-background w-full sm:w-[220px]">
              <SelectValue placeholder="Select Domain" />
            </SelectTrigger>
            <SelectContent className="max-h-[80vh] overflow-y-auto">
              {domains.map((d) => (
                <SelectItem key={d.id} value={d.name}>
                  {d.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <DateRangeFilter
            currentDays={days}
            basePath={`/diagnostics/${currentDomainName}`}
            from={fromDate}
            to={toDate}
          />

          <ExportPdfButton />
        </div>
      </div>

      {/* Hero: Score & Protocol Overview */}
      <div className="flex flex-col gap-6">
        <DomainScoreBadge score={score} domain={currentDomainName} />
        <ProtocolOverviewPanel dns={dns} onOpenSection={openSection} />
      </div>

      {/* Detailed protocol sections, collapsed until opened here or from an overview row */}
      <div className="flex flex-col gap-6">
        <DnsRecordsSection dns={dns} {...getSectionProps('dns')} />
        <DmarcDetailSection dns={dns} {...getSectionProps('dmarc')} />
        <SpfDetailSection dns={dns} {...getSectionProps('spf')} />
        <SpfLookupTreeSection dns={dns} {...getSectionProps('spf-tree')} />
        <DkimDetailSection dns={dns} {...getSectionProps('dkim')} />
        <BimiDetailSection dns={dns} {...getSectionProps('bimi')} />
        <MtaStsDetailSection dns={dns} {...getSectionProps('mta-sts')} />
        <TlsRptDetailSection dns={dns} {...getSectionProps('tls-rpt')} />
      </div>
    </div>
  )
}
