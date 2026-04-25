import {
  Button,
  Calendar,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui'
import { useDateRangeFilterContent } from '@/hooks/filters'
import { cn } from '@/lib/utils'
import type { DateRangeFilterProps } from '@/types/filters'
import { DATE_RANGE_DAYS, DATE_RANGE_LABELS } from '@/types/filters'
import { Calendar as CalendarIcon } from 'lucide-react'
import { renderDateLabel } from './renderDateLabel'

export function DateRangeFilterContent({
  currentDays,
  basePath,
  from,
  to,
}: Readonly<DateRangeFilterProps>) {
  const {
    date,
    isCustom,
    isOpen,
    selectValue,
    setDate,
    setIsOpen,
    handleApply,
    handleQuickRangeChange,
  } = useDateRangeFilterContent({ basePath, currentDays, from, to })

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Select value={selectValue} onValueChange={handleQuickRangeChange}>
        <SelectTrigger className="bg-background h-9 w-[160px]">
          <SelectValue placeholder="Select Range" />
        </SelectTrigger>
        <SelectContent>
          {DATE_RANGE_DAYS.map((days) => (
            <SelectItem key={days} value={String(days)}>
              {DATE_RANGE_LABELS[days as number]}
            </SelectItem>
          ))}
          <SelectItem value="custom">Custom Range</SelectItem>
        </SelectContent>
      </Select>

      {isCustom && (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className={cn(
                'bg-background h-9 w-[260px] justify-start text-left font-normal',
                !date && 'text-muted-foreground',
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {renderDateLabel(date)}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              mode="range"
              {...(date?.from ? { defaultMonth: date.from } : {})}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />
            <div className="flex justify-end border-t p-2">
              <Button size="sm" onClick={handleApply}>
                Apply
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  )
}
