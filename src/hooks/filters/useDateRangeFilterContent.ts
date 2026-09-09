import { useDashboardFilters } from '@/hooks/dashboard'
import type {
  DateRangeFilterProps,
  UseDateRangeFilterContentReturn,
} from '@/types/filters'
import {
  buildCustomRangeParams,
  buildQuickRangeParams,
  parseQuickRangeDays,
} from '@/utils/filters'
import { useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import type { DateRange } from 'react-day-picker'
import { useReplaceQuery } from './useReplaceQuery'

export function useDateRangeFilterContent(
  props: Readonly<DateRangeFilterProps>,
): UseDateRangeFilterContentReturn {
  const searchParams = useSearchParams()
  const replaceQuery = useReplaceQuery(props.basePath)
  const setFilter = useDashboardFilters((s) => s.setFilter)

  const [date, setDate] = useState<DateRange | undefined>({
    from: props.from,
    to: props.to,
  })
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setFilter(props.currentDays, props.from, props.to)
  }, [props.currentDays, props.from, props.to, setFilter])

  const isCustom =
    searchParams.get('days') === 'custom' ||
    props.from != null ||
    props.to != null

  const selectValue = useMemo(() => {
    return isCustom ? 'custom' : String(props.currentDays)
  }, [isCustom, props.currentDays])

  const handleQuickRangeChange = (value: string) => {
    const params = buildQuickRangeParams(searchParams, value)
    if (value !== 'custom') {
      const days = parseQuickRangeDays(value)
      if (days == null) return
      setDate(undefined)
      setFilter(days, undefined, undefined)
    }
    replaceQuery(params)
  }

  const handleApply = () => {
    const params = buildCustomRangeParams(searchParams, date)
    setFilter(9999, date?.from, date?.to)
    replaceQuery(params)
    setIsOpen(false)
  }

  return {
    date,
    isCustom,
    isOpen,
    selectValue,
    setDate,
    setIsOpen,
    handleApply,
    handleQuickRangeChange,
  }
}
