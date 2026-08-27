import type { DashboardFilterInitializerProps } from '@/types/dashboard'
import { useEffect } from 'react'
import { useDashboardFilters } from './useDashboardFilters'

export function useDashboardFilterInitializer(
  props: Readonly<DashboardFilterInitializerProps>,
): void {
  const setFilter = useDashboardFilters((s) => s.setFilter)

  useEffect(() => {
    setFilter(props.days, props.from, props.to)
  }, [props.days, props.from, props.to, setFilter])
}
