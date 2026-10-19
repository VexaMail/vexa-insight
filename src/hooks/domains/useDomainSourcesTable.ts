'use client'

import type { DomainSourceRow } from '@/types/domains'
import { filterSourceRows, listSourceCountries } from '@/utils/domains'
import { useMemo } from 'react'
import { useDomainSourcesRefresh } from './useDomainSourcesRefresh'
import { useSourceFilterParams } from './useSourceFilterParams'

/** Filtered rows, filter state and hostname refresh of the sources table. */
export function useDomainSourcesTable(sources: readonly DomainSourceRow[]) {
  const filters = useSourceFilterParams()
  const refresh = useDomainSourcesRefresh()
  const { classFilter, country } = filters
  const rows = useMemo(
    () => filterSourceRows(sources, classFilter, country),
    [sources, classFilter, country],
  )
  const countryOptions = useMemo(() => listSourceCountries(sources), [sources])
  return { ...filters, ...refresh, rows, countryOptions }
}
