import type { SourceWindowOption } from '@/types/domains'

/** Windows the sources tab can cover; zero days means all reports. */
export const SOURCE_WINDOW_OPTIONS: readonly SourceWindowOption[] = [
  { days: 0, label: 'All reports' },
  { days: 7, label: 'Last 7 days' },
  { days: 30, label: 'Last 30 days' },
  { days: 90, label: 'Last 90 days' },
]
