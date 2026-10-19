import { DIAGNOSTICS_GRADE_BAND_OPTIONS } from '@/constants/diagnostics'
import { STATUS_TONE_DOT_CLASSES } from '@/constants/ui'
import { cn } from '@/lib/utils'
import type { DiagnosticsGradeFilterProps } from '@/types/diagnostics'

/** Quick filter by grade band: Poor, Fair, Good, or no DNS answer. */
export function DiagnosticsGradeFilter({
  value,
  counts,
  onChange,
}: Readonly<DiagnosticsGradeFilterProps>) {
  return (
    <div
      role="group"
      aria-label="Filter by grade"
      className="border-border bg-card flex max-w-full flex-wrap gap-1 rounded-lg border p-1"
    >
      {DIAGNOSTICS_GRADE_BAND_OPTIONS.map((option) => {
        const isActive = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={isActive}
            onClick={() => {
              onChange(option.value)
            }}
            className={cn(
              'focus-visible:ring-ring inline-flex min-h-9 cursor-pointer items-center gap-1.5 rounded-md px-2.5 text-xs font-medium transition-colors duration-150 focus-visible:ring-2 focus-visible:outline-none',
              isActive
                ? 'bg-accent text-foreground'
                : 'text-muted-foreground hover:bg-accent/60 hover:text-foreground',
            )}
          >
            {option.value === 'all' ? null : (
              <span
                aria-hidden
                className={cn(
                  'h-2 w-2 rounded-full',
                  STATUS_TONE_DOT_CLASSES[option.tone],
                )}
              />
            )}
            {option.label}
            <span className="text-muted-foreground font-mono tabular-nums">
              {counts[option.countKey]}
            </span>
          </button>
        )
      })}
    </div>
  )
}
