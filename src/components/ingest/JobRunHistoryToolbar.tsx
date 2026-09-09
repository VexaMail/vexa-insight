'use client'

import type { JobRunHistoryToolbarProps } from './JobRunHistoryToolbarProps'

/** Selected-job note and the "hide empty runs" toggle above the table. */
export function JobRunHistoryToolbar({
  selectedJobId,
  hideEmpty,
  onClearSelection,
  onToggleHideEmpty,
}: Readonly<JobRunHistoryToolbarProps>) {
  return (
    <div className="flex items-center justify-between gap-2">
      {selectedJobId !== null && (
        <p className="text-muted-foreground text-xs">
          Viewing Job{' '}
          <span className="text-foreground font-medium">#{selectedJobId}</span>
          {' — '}
          <button
            onClick={onClearSelection}
            className="text-primary hover:underline"
          >
            Clear selection
          </button>
        </p>
      )}
      <div className="ml-auto flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
        <label htmlFor="hide-empty" className="cursor-pointer select-none">
          Hide empty runs
        </label>
        <input
          id="hide-empty"
          type="checkbox"
          checked={hideEmpty}
          onChange={(e) => {
            onToggleHideEmpty(e.target.checked)
          }}
          className="h-4 w-4 accent-zinc-900 dark:accent-zinc-50"
        />
      </div>
    </div>
  )
}
