import type { DateRange } from 'react-day-picker'

export type CustomRangePopoverProps = {
  readonly date: DateRange | undefined
  readonly isOpen: boolean
  readonly onDateChange: (date: DateRange | undefined) => void
  readonly onOpenChange: (isOpen: boolean) => void
  readonly onApply: () => void
}
