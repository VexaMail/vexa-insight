'use client'

import { Button } from '@/components/ui'
import type { PollProgressListProps } from '@/types/ingest'
import { usePollProgressPagination } from '../../hooks/ingest/usePollProgressPagination'
import EmailPipelineCard from './EmailPipelineCard'
import { PAGE_SIZE_OPTIONS } from './pageSizeOptions'

export default function PollProgressList({}: Readonly<PollProgressListProps>) {
  const {
    items,
    page,
    pageSize,
    total,
    setPage,
    handlePageSizeChange,
    maxPage,
    canPrevious,
    canNext,
  } = usePollProgressPagination()

  return (
    <div aria-live="polite" aria-atomic="false" className="mt-4 space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4">
        <label
          htmlFor="poll-progress-page-size"
          className="text-muted-foreground text-sm"
        >
          Page size
        </label>
        <select
          id="poll-progress-page-size"
          value={pageSize}
          onChange={handlePageSizeChange}
          className="border-border bg-card text-foreground rounded-md border px-2 py-1.5 text-sm"
          aria-label="Items per page"
        >
          {PAGE_SIZE_OPTIONS.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        <span className="text-muted-foreground text-sm">
          Total: {total.toLocaleString()}
        </span>
      </div>

      {/* Pipeline cards */}
      <ul role="list" className="list-none space-y-3 p-0">
        {items.map((item) => (
          <EmailPipelineCard key={item.id} item={item} />
        ))}
      </ul>

      {/* Pagination */}
      <div className="border-border/50 flex flex-wrap items-center gap-3 border-t pt-3">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => {
            if (canPrevious) setPage(page - 1)
          }}
          disabled={!canPrevious}
          className="h-7 text-xs"
          aria-label="Previous page"
        >
          Previous
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => {
            if (canNext) setPage(page + 1)
          }}
          disabled={!canNext}
          className="h-7 text-xs"
          aria-label="Next page"
        >
          Next
        </Button>
        <span className="text-muted-foreground text-sm">
          Page {page} of {maxPage}
        </span>
      </div>
    </div>
  )
}
