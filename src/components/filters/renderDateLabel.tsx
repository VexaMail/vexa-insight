import { format } from 'date-fns'
import type { DateRange } from 'react-day-picker'

export function renderDateLabel(date: DateRange | undefined) {
  if (!date?.from) return <span>Pick a date range</span>
  if (date.to) {
    return (
      <>
        {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
      </>
    )
  }
  return <span>{format(date.from, 'LLL dd, y')}</span>
}
