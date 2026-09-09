'use client'

import { DayPicker, getDefaultClassNames } from 'react-day-picker'

import { cn } from '@/lib/utils'
import { calendarComponents } from './calendarComponents'
import { calendarGridClassNames } from './calendarGridClassNames'
import { calendarNavClassNames } from './calendarNavClassNames'
import type { CalendarProps } from './CalendarProps'

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = 'label',
  buttonVariant = 'ghost',
  formatters,
  components,
  ...props
}: CalendarProps) {
  const defaultClassNames = getDefaultClassNames()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        'bg-background group/calendar p-3 [--cell-size:2.5rem] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent',
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className,
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString('default', { month: 'short' }),
        ...formatters,
      }}
      classNames={{
        ...calendarNavClassNames({
          defaultClassNames,
          buttonVariant,
          captionLayout,
        }),
        ...calendarGridClassNames(defaultClassNames),
        ...classNames,
      }}
      components={{ ...calendarComponents, ...components }}
      {...props}
    />
  )
}

export { Calendar }
