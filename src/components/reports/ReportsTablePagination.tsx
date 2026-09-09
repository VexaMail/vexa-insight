import { UnifiedPagination } from '@/components/ui'
import type { ReportsTablePaginationProps } from './ReportsTablePaginationProps'

export function ReportsTablePagination({
  data,
  dispatch,
}: Readonly<ReportsTablePaginationProps>) {
  return (
    <UnifiedPagination
      page={data.page}
      pageSize={data.pageSize}
      total={data.total}
      onPageChange={(p) => {
        dispatch({ type: 'SET_PAGE', payload: p })
      }}
      onPageSizeChange={(s) => {
        dispatch({ type: 'SET_PAGE_SIZE', payload: s })
      }}
    />
  )
}
