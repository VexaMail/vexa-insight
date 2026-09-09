'use client'

import { buildOrgOptionsQuery } from '@/utils/reports'
import { useMemo } from 'react'
import { useFetchedOptions } from './useFetchedOptions'

/** Org and domain filter choices for the current date window and domain. */
export function useReportsFilterOptions(
  dateFilterParams: string,
  domainId: number | undefined,
): { orgOptions: string[]; domainOptions: string[] } {
  const orgOptionsQuery = useMemo(
    () => buildOrgOptionsQuery(dateFilterParams, domainId),
    [dateFilterParams, domainId],
  )
  const orgOptions = useFetchedOptions(
    '/api/v1/reports/org-options',
    orgOptionsQuery,
    true,
  )
  const fetchedDomainOptions = useFetchedOptions(
    '/api/v1/reports/domain-options',
    dateFilterParams,
    !domainId,
  )
  return {
    orgOptions,
    domainOptions: domainId ? [] : fetchedDomainOptions,
  }
}
