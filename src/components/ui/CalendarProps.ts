import type * as React from 'react'
import type { DayPicker } from 'react-day-picker'
import type { ButtonProps } from './ButtonProps'

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: ButtonProps['variant']
}
