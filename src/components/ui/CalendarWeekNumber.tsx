import type { WeekNumberProps } from 'react-day-picker'

export function CalendarWeekNumber({
  children,
  week: _week,
  ...props
}: WeekNumberProps) {
  return (
    <td {...props}>
      <div className="flex size-[--cell-size] items-center justify-center text-center">
        {children}
      </div>
    </td>
  )
}
