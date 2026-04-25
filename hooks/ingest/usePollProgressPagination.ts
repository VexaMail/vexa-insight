import { useIngestContext } from './useIngestContext'

export function usePollProgressPagination() {
  const items = useIngestContext((s) => s.progressItems)
  const page = useIngestContext((s) => s.page)
  const pageSize = useIngestContext((s) => s.pageSize)
  const total = useIngestContext((s) => s.progressTotal)
  const setPage = useIngestContext((s) => s.setPage)
  const setPageSize = useIngestContext((s) => s.setPageSize)

  const maxPage = total > 0 ? Math.ceil(total / pageSize) : 1
  const canPrevious = page > 1
  const canNext = page < maxPage

  function handlePageSizeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = Number(e.target.value)
    if (!Number.isNaN(value)) setPageSize(value)
  }

  return {
    items,
    page,
    pageSize,
    total,
    setPage,
    handlePageSizeChange,
    maxPage,
    canPrevious,
    canNext,
  }
}
