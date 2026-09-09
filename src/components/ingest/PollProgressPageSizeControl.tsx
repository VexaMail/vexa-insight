'use client'

import { PAGE_SIZE_OPTIONS } from './pageSizeOptions'
import type { PollProgressPageSizeControlProps } from './PollProgressPageSizeControlProps'

export function PollProgressPageSizeControl({
  pageSize,
  total,
  onChange,
}: Readonly<PollProgressPageSizeControlProps>) {
  return (
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
        onChange={onChange}
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
  )
}
