import {
  SOURCE_CLASS_OPTIONS,
  SOURCE_WINDOW_OPTIONS,
} from '@/constants/domains'
import { CalendarDays, Filter, Globe } from 'lucide-react'
import type { SourcesToolbarProps } from './SourcesToolbarProps'
import { ToolbarSelect } from './ToolbarSelect'

/** Classification, country and window filters of the sources table. */
export function SourcesToolbar(props: Readonly<SourcesToolbarProps>) {
  const windows = SOURCE_WINDOW_OPTIONS.map((o) => ({
    value: String(o.days),
    label: o.label,
  }))
  return (
    <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto sm:flex-wrap sm:items-center">
      <ToolbarSelect
        label="Filter sources by classification"
        icon={Filter}
        value={props.classFilter}
        options={SOURCE_CLASS_OPTIONS}
        onChange={props.onClassChange}
      />
      <ToolbarSelect
        label="Filter sources by country"
        icon={Globe}
        value={props.country}
        options={[
          { value: 'all', label: 'All countries' },
          ...props.countryOptions,
        ]}
        onChange={props.onCountryChange}
      />
      <ToolbarSelect
        label="Window of reports"
        icon={CalendarDays}
        value={String(props.days ?? 0)}
        options={windows}
        onChange={props.onDaysChange}
      />
    </div>
  )
}
