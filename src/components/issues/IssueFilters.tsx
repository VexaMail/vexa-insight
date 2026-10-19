'use client'

import { Input } from '@/components/ui'
import {
  ISSUE_SEVERITY_OPTIONS,
  ISSUE_STATE_OPTIONS,
} from '@/constants/dashboard'
import { Search } from 'lucide-react'
import { IssueFilterSelect } from './IssueFilterSelect'
import type { IssueFiltersProps } from './IssueFiltersProps'

/** Domain or source search, severity and state. */
export function IssueFilters({ filters }: Readonly<IssueFiltersProps>) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <div className="relative min-w-0 flex-1">
        <label htmlFor="issue-search" className="sr-only">
          Search domain or source
        </label>
        <Search
          aria-hidden
          className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2"
        />
        <Input
          id="issue-search"
          type="search"
          value={filters.filter.query}
          placeholder="Search domain or source"
          className="bg-card h-10 pl-9"
          onChange={(event) => {
            filters.setQuery(event.target.value)
          }}
        />
      </div>
      <IssueFilterSelect
        label="Severity"
        value={filters.filter.severity}
        options={ISSUE_SEVERITY_OPTIONS}
        onChange={filters.setSeverity}
      />
      <IssueFilterSelect
        label="State"
        value={filters.filter.state}
        options={ISSUE_STATE_OPTIONS}
        onChange={filters.setState}
      />
    </div>
  )
}
