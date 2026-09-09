import type { PageNavButtonsProps } from '@/types/ui'
import { Button } from './button'

/** Previous and next buttons around the "Page N of M" label. */
export function PageNavButtons({
  page,
  maxPage,
  onPageChange,
}: Readonly<PageNavButtonsProps>) {
  const canPrevious = page > 1
  const canNext = page < maxPage

  return (
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
  )
}
