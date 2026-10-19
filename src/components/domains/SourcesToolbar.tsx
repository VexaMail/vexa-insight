import {
  SOURCE_CLASS_OPTIONS,
  SOURCE_WINDOW_OPTIONS,
} from '@/constants/domains'
import { Download } from 'lucide-react'
import type { SourcesToolbarProps } from './SourcesToolbarProps'
import { ToolbarSelect } from './ToolbarSelect'

/** Classification, country and window filters plus the CSV download. */
export function SourcesToolbar(props: Readonly<SourcesToolbarProps>) {
  const windows = SOURCE_WINDOW_OPTIONS.map((o) => ({
    value: String(o.days),
    label: o.label,
  }))
  return (
    <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto sm:flex-wrap sm:items-center">
      <ToolbarSelect
        label="Filter sources by classification"
        value={props.classFilter}
        options={SOURCE_CLASS_OPTIONS}
        onChange={props.onClassChange}
      />
      <ToolbarSelect
        label="Filter sources by country"
        value={props.country}
        options={[
          { value: 'all', label: 'All countries' },
          ...props.countryOptions,
        ]}
        onChange={props.onCountryChange}
      />
      <ToolbarSelect
        label="Window of reports"
        value={String(props.days ?? 0)}
        options={windows}
        onChange={props.onDaysChange}
      />
      {props.csvHref ? (
        <a
          href={props.csvHref}
          className="border-border bg-card text-foreground hover:bg-accent focus-visible:ring-ring inline-flex h-10 items-center justify-center gap-2 rounded-md border px-3 text-sm font-medium transition-colors duration-150 focus-visible:ring-2 focus-visible:outline-none"
        >
          <Download className="h-4 w-4" aria-hidden /> CSV
        </a>
      ) : null}
    </div>
  )
}
