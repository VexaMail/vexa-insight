import { cn } from '@/lib/utils'
import { buttonVariants } from './buttonVariants'
import type { CalendarClassNamesParams } from './CalendarClassNamesParams'

/** Class names for the calendar frame, month navigation and caption. */
export function calendarNavClassNames({
  defaultClassNames,
  buttonVariant,
  captionLayout,
}: CalendarClassNamesParams) {
  const navButton = cn(
    buttonVariants({ variant: buttonVariant }),
    'h-[--cell-size] w-[--cell-size] select-none p-0 aria-disabled:opacity-50',
  )
  return {
    root: cn('w-fit', defaultClassNames.root),
    months: cn(
      'relative flex flex-col gap-4 md:flex-row',
      defaultClassNames.months,
    ),
    month: cn('flex w-full flex-col gap-4', defaultClassNames.month),
    nav: cn(
      'absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1',
      defaultClassNames.nav,
    ),
    button_previous: cn(navButton, defaultClassNames.button_previous),
    button_next: cn(navButton, defaultClassNames.button_next),
    month_caption: cn(
      'flex h-[--cell-size] w-full items-center justify-center px-[--cell-size]',
      defaultClassNames.month_caption,
    ),
    dropdowns: cn(
      'flex h-[--cell-size] w-full items-center justify-center gap-1.5 text-sm font-medium',
      defaultClassNames.dropdowns,
    ),
    dropdown_root: cn(
      'has-focus:border-ring border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] relative rounded-md border',
      defaultClassNames.dropdown_root,
    ),
    dropdown: cn(
      'bg-popover absolute inset-0 opacity-0',
      defaultClassNames.dropdown,
    ),
    caption_label: cn(
      'select-none font-medium',
      captionLayout === 'label'
        ? 'text-sm'
        : '[&>svg]:text-muted-foreground flex h-8 items-center gap-1 rounded-md pl-2 pr-1 text-sm [&>svg]:size-3.5',
      defaultClassNames.caption_label,
    ),
  }
}
