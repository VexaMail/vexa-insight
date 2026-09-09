'use client'

import { cn } from '@/lib/utils'
import type { PollProgressListProps } from '@/types/ingest'
import { usePollProgressPagination } from '../../hooks/ingest/usePollProgressPagination'
import EmailPipelineCard from './EmailPipelineCard'
import { PollProgressPageSizeControl } from './PollProgressPageSizeControl'
import { PollProgressPagination } from './PollProgressPagination'

export default function PollProgressList({
  className,
}: Readonly<PollProgressListProps>) {
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
    <div
      aria-live="polite"
      aria-atomic="false"
      className={cn('mt-4 space-y-4', className)}
    >
      <PollProgressPageSizeControl
        pageSize={pageSize}
        total={total}
        onChange={handlePageSizeChange}
      />
      <ul className="list-none space-y-3 p-0">
        {items.map((item) => (
          <EmailPipelineCard key={item.id} item={item} />
        ))}
      </ul>
      <PollProgressPagination
        page={page}
        maxPage={maxPage}
        canPrevious={canPrevious}
        canNext={canNext}
        onPageChange={setPage}
      />
    </div>
  )
}
