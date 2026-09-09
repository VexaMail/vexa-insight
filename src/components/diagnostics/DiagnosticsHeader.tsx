'use client'

import { DateRangeFilter } from '@/components/filters'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui'
import type { DiagnosticsHeaderProps } from './DiagnosticsHeaderProps'
import { ExportPdfButton } from './ExportPdfButton'

/** Page title with the domain selector, date range filter and PDF export. */
export function DiagnosticsHeader({
  domains,
  currentDomainName,
  days,
  fromDate,
  toDate,
  onDomainChange,
}: Readonly<DiagnosticsHeaderProps>) {
  return (
    <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <h1 className="font-display text-foreground text-2xl font-bold tracking-tight">
        Diagnostics
      </h1>

      <div className="flex flex-wrap items-center gap-4 print:hidden">
        <Select value={currentDomainName} onValueChange={onDomainChange}>
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
  )
}
