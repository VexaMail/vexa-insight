'use client'

import { DateRangeFilter } from '@/components/filters'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui'
import { useDiagnosticsView } from '@/hooks/diagnostics'
import type { DiagnosticsHeaderControlsProps } from './DiagnosticsHeaderControlsProps'
import { ExportPdfButton } from './ExportPdfButton'

/** Domain switcher, report window and the PDF export, below the title. */
export function DiagnosticsHeaderControls({
  domains,
  currentDomainName,
  days,
  fromDate,
  toDate,
}: Readonly<DiagnosticsHeaderControlsProps>) {
  const { handleDomainChange } = useDiagnosticsView()

  return (
    <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto print:hidden">
      <Select value={currentDomainName} onValueChange={handleDomainChange}>
        <SelectTrigger
          aria-label="Domain"
          className="bg-card h-9 w-full font-mono text-xs sm:w-[220px]"
        >
          <SelectValue placeholder="Select domain" />
        </SelectTrigger>
        <SelectContent className="max-h-[80vh] overflow-y-auto">
          {domains.map((d) => (
            <SelectItem key={d.id} value={d.name} className="font-mono">
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
  )
}
