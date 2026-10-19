import type { DateRangeFilterProps } from '@/types/filters'

export type TriageHeaderProps = Readonly<{
  days: DateRangeFilterProps['currentDays']
  basePath: DateRangeFilterProps['basePath']
  from: DateRangeFilterProps['from']
  to: DateRangeFilterProps['to']
  /** e.g. "last 30 days". */
  windowLabel: string
}>
