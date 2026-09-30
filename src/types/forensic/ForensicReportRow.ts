import type { ForensicReport } from './ForensicReport'

/** A stored failure report as listed on the domain page. */
export type ForensicReportRow = Omit<ForensicReport, 'sourceMessageId'> & {
  id: number
}
