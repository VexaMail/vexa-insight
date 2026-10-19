import type { ReportsWindowSummary } from '@/types/reports'

/** Totals of a window with no reports, or none the viewer may see. */
export const EMPTY_REPORTS_WINDOW_SUMMARY: ReportsWindowSummary = {
  reports: 0,
  reporters: 0,
  domains: 0,
  messages: 0,
  failingMessages: 0,
}
