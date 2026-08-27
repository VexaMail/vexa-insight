import { useDashboardFilters } from '@/hooks/dashboard'
import type {
  DateRangeFilterProps,
  UseDateRangeFilterContentReturn,
} from '@/types/filters'
import { DATE_RANGE_DAYS } from '@/types/filters'
import { format } from 'date-fns'
import { useRouter, useSearchParams } from 'next/navigation'
import { startTransition, useEffect, useMemo, useState } from 'react'
import type { DateRange } from 'react-day-picker'

export function useDateRangeFilterContent(
  props: Readonly<DateRangeFilterProps>,
): UseDateRangeFilterContentReturn {
  const router = useRouter()
  const searchParams = useSearchParams()
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
    const params = new URLSearchParams(searchParams.toString())

    if (value === 'custom') {
      params.set('days', 'custom')
    } else {
      const parsedDays = parseInt(value, 10)
      const days = DATE_RANGE_DAYS.find((d) => d === parsedDays)
      if (days == null) return

      params.set('days', value)
      params.delete('from')
      params.delete('to')
      setDate(undefined)
      setFilter(days, undefined, undefined)
    }

    startTransition(() => {
      router.replace(`${props.basePath}?${params.toString()}`, {
        scroll: false,
      })
    })
  }

  const handleApply = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('days', 'custom')

    if (date?.from) {
      params.set('from', format(date.from, 'yyyy-MM-dd'))
    } else {
      params.delete('from')
    }

    if (date?.to) {
      params.set('to', format(date.to, 'yyyy-MM-dd'))
    } else {
      params.delete('to')
    }

    setFilter(9999, date?.from, date?.to)

    startTransition(() => {
      router.replace(`${props.basePath}?${params.toString()}`, {
        scroll: false,
      })
    })

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
