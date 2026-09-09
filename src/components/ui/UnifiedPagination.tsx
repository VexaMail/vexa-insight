'use client'

import { PageNavButtons } from './PageNavButtons'
import { PageSizeSelect } from './PageSizeSelect'
import type { UnifiedPaginationProps } from './UnifiedPaginationProps'

export function UnifiedPagination({
  page,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 25, 50, 100],
}: Readonly<UnifiedPaginationProps>) {
  const maxPage = total > 0 ? Math.ceil(total / pageSize) : 1

  return (
    <div className="text-muted-foreground flex flex-wrap items-center gap-3 pt-1 text-xs">
      <PageSizeSelect
        pageSize={pageSize}
        options={pageSizeOptions}
        onChange={onPageSizeChange}
      />

      <span className="text-muted-foreground">
        Total: {total.toLocaleString()}
      </span>

      <PageNavButtons
        page={page}
        maxPage={maxPage}
        onPageChange={onPageChange}
      />
    </div>
  )
}
