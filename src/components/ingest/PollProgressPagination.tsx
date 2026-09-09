'use client'

import { Button } from '@/components/ui'
import type { PollProgressPaginationProps } from './PollProgressPaginationProps'

export function PollProgressPagination({
  page,
  maxPage,
  canPrevious,
  canNext,
  onPageChange,
}: Readonly<PollProgressPaginationProps>) {
  return (
    <div className="border-border/50 flex flex-wrap items-center gap-3 border-t pt-3">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => {
          if (canPrevious) onPageChange(page - 1)
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
          if (canNext) onPageChange(page + 1)
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
  )
}
