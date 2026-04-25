/**
 * Props for the reports pagination controls component.
 */
export type ReportsPaginationProps = {
  page: number
  pageSize: number
  total: number
  onPageChange: (page: number) => void
}
