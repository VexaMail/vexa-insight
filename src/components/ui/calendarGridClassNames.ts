import { cn } from '@/lib/utils'
import type { ClassNames } from 'react-day-picker'

/** Class names for the weekday header, weeks and day cells of the calendar. */
export function calendarGridClassNames(defaultClassNames: ClassNames) {
  return {
    weekdays: cn('flex', defaultClassNames.weekdays),
    weekday: cn(
      'text-muted-foreground flex-1 select-none rounded-md text-[0.8rem] font-normal',
      defaultClassNames.weekday,
    ),
    week: cn('mt-2 flex w-full', defaultClassNames.week),
    week_number_header: cn(
      'w-[--cell-size] select-none',
      defaultClassNames.week_number_header,
    ),
    week_number: cn(
      'text-muted-foreground select-none text-[0.8rem]',
      defaultClassNames.week_number,
    ),
    day: cn(
      'group/day relative aspect-square h-full w-full select-none p-1 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md',
      defaultClassNames.day,
    ),
    range_start: cn('bg-accent rounded-l-md', defaultClassNames.range_start),
    range_middle: cn('rounded-none', defaultClassNames.range_middle),
    range_end: cn('bg-accent rounded-r-md', defaultClassNames.range_end),
    today: cn(
      'bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none',
      defaultClassNames.today,
    ),
    outside: cn(
      'text-muted-foreground aria-selected:text-muted-foreground',
      defaultClassNames.outside,
    ),
    disabled: cn(
      'text-muted-foreground opacity-50',
      defaultClassNames.disabled,
    ),
    hidden: cn('invisible', defaultClassNames.hidden),
  }
}
