import {
  Button,
  Calendar,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui'
import { cn } from '@/lib/utils'
import { Calendar as CalendarIcon } from 'lucide-react'
import type { CustomRangePopoverProps } from './CustomRangePopoverProps'
import { renderDateLabel } from './renderDateLabel'

export function CustomRangePopover({
  date,
  isOpen,
  onDateChange,
  onOpenChange,
  onApply,
}: Readonly<CustomRangePopoverProps>) {
  return (
    <Popover open={isOpen} onOpenChange={onOpenChange}>
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
          onSelect={onDateChange}
          numberOfMonths={2}
        />
        <div className="flex justify-end border-t p-2">
          <Button size="sm" onClick={onApply}>
            Apply
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
