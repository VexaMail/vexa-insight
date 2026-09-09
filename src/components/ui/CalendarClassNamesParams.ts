import type { ClassNames } from 'react-day-picker'
import type { CalendarProps } from './CalendarProps'

export type CalendarClassNamesParams = {
  readonly defaultClassNames: ClassNames
  readonly buttonVariant: CalendarProps['buttonVariant']
  readonly captionLayout: CalendarProps['captionLayout']
}
