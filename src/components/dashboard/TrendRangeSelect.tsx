'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui'
import { useTrendRange } from '@/hooks/dashboard'
import { CalendarDays } from 'lucide-react'
import type { TrendRangeSelectProps } from './TrendRangeSelectProps'

/** The trend chart's own range, independent of the page's date filter. */
export function TrendRangeSelect({
  options,
  fallback,
}: Readonly<TrendRangeSelectProps>) {
  const range = useTrendRange(fallback)
  return (
    <Select value={range.value} onValueChange={range.select}>
      <SelectTrigger
        aria-label="Trend range"
        className="bg-card h-8 w-auto cursor-pointer gap-2 text-xs"
      >
        <CalendarDays
          aria-hidden
          className="text-muted-foreground h-3.5 w-3.5"
        />
        <SelectValue />
      </SelectTrigger>
      <SelectContent align="end">
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
