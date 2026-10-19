import {
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui'
import {
  findingSeverityFilterOptions,
  findingSeverityLabels,
} from '@/constants/diagnostics'
import { Search } from 'lucide-react'
import type { FindingsToolbarProps } from './FindingsToolbarProps'

/** Severity filter, text search and the number of findings shown. */
export function FindingsToolbar({ filter }: Readonly<FindingsToolbarProps>) {
  return (
    <div className="flex flex-wrap items-center gap-2 print:hidden">
      <Select value={filter.severity} onValueChange={filter.setSeverity}>
        <SelectTrigger
          aria-label="Severity"
          className="bg-background h-9 w-full text-xs sm:w-40"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {findingSeverityFilterOptions.map((option) => (
            <SelectItem key={option} value={option}>
              {option === 'all'
                ? 'All severities'
                : findingSeverityLabels[option]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="relative w-full sm:w-56">
        <Search
          aria-hidden
          className="text-muted-foreground pointer-events-none absolute top-1/2 left-2.5 h-4 w-4 -translate-y-1/2"
        />
        <Input
          type="search"
          aria-label="Search findings"
          placeholder="Search findings…"
          value={filter.search}
          onChange={(event) => {
            filter.setSearch(event.target.value)
          }}
          className="h-9 pl-8 text-xs"
        />
      </div>
      <span className="text-muted-foreground font-mono text-xs whitespace-nowrap tabular-nums">
        {filter.visible.length}{' '}
        {filter.visible.length === 1 ? 'finding' : 'findings'}
      </span>
    </div>
  )
}
