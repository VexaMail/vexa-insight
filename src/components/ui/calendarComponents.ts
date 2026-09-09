import { CalendarChevron } from './CalendarChevron'
import { CalendarDayButton } from './CalendarDayButton'
import { CalendarRoot } from './CalendarRoot'
import { CalendarWeekNumber } from './CalendarWeekNumber'

/** The react-day-picker parts the calendar replaces with its own. */
export const calendarComponents = {
  Root: CalendarRoot,
  Chevron: CalendarChevron,
  DayButton: CalendarDayButton,
  WeekNumber: CalendarWeekNumber,
}
