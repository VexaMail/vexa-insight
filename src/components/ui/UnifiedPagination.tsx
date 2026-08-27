'use client'

import { Button } from './button'
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
  const canPrevious = page > 1
  const canNext = page < maxPage

  return (
    <div className="text-muted-foreground flex flex-wrap items-center gap-3 pt-1 text-xs">
      <label htmlFor="unified-page-size" className="text-muted-foreground">
        Page size
      </label>
      <select
        id="unified-page-size"
        value={pageSize}
        onChange={(e) => {
          const v = Number(e.target.value)
          if (!Number.isNaN(v)) onPageSizeChange(v)
        }}
        className="bg-card border-border/50 text-foreground h-7 rounded-md border px-2 text-xs"
        aria-label="Items per page"
      >
        {pageSizeOptions.map((size) => {
          const val = size === 'all' ? 100000 : size
          const label = size === 'all' ? 'All' : String(size)
          return (
            <option key={size} value={val}>
              {label}
            </option>
          )
        })}
      </select>

      <span className="text-muted-foreground">
        Total: {total.toLocaleString()}
      </span>

      <div className="ml-auto flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="h-7 text-xs"
          onClick={() => {
            if (canPrevious) onPageChange(page - 1)
          }}
          disabled={!canPrevious}
          aria-label="Previous page"
        >
          Previous
        </Button>
        <span className="text-muted-foreground text-xs">
          Page {page} of {maxPage}
        </span>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 text-xs"
          onClick={() => {
            if (canNext) onPageChange(page + 1)
          }}
          disabled={!canNext}
          aria-label="Next page"
        >
          Next
        </Button>
      </div>
    </div>
  )
}
