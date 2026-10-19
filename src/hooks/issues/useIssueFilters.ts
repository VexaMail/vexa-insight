'use client'

import type {
  IssueFilterState,
  QueuedIssue,
  UseIssueFiltersReturn,
} from '@/types/dashboard'
import {
  filterIssues,
  parseIssueSeverityFilter,
  parseIssueStateFilter,
} from '@/utils/dashboard'
import { useMemo, useState } from 'react'

/** Severity, state and text filters over the full issue queue. */
export function useIssueFilters(
  issues: readonly QueuedIssue[],
): UseIssueFiltersReturn {
  const [filter, setFilter] = useState<IssueFilterState>({
    severity: 'all',
    state: 'active',
    query: '',
  })
  const visible = useMemo(() => filterIssues(issues, filter), [issues, filter])
  return {
    filter,
    visible,
    setSeverity: (value) => {
      setFilter({ ...filter, severity: parseIssueSeverityFilter(value) })
    },
    setState: (value) => {
      setFilter({ ...filter, state: parseIssueStateFilter(value) })
    },
    setQuery: (value) => {
      setFilter({ ...filter, query: value })
    },
  }
}
