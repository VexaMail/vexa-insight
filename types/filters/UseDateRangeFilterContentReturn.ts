import type { DateRange } from 'react-day-picker'

export type UseDateRangeFilterContentReturn = {
  readonly date: DateRange | undefined
  readonly isCustom: boolean
  readonly isOpen: boolean
  readonly selectValue: string
  readonly setDate: (date: DateRange | undefined) => void
  readonly setIsOpen: (isOpen: boolean) => void
  readonly handleApply: () => void
  readonly handleQuickRangeChange: (value: string) => void
}
