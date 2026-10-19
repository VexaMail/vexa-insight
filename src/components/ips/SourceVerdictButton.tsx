import { cn } from '@/lib/utils'
import type { SourceVerdictButtonProps } from '@/types/ips'

/** One verdict toggle; pressing the active one clears it. */
export function SourceVerdictButton({
  option,
  active,
  disabled,
  onToggle,
}: Readonly<SourceVerdictButtonProps>) {
  const activeTone =
    option.verdict === 'unauthorized'
      ? 'border-danger/40 bg-danger/10 text-danger'
      : 'border-success/40 bg-success/10 text-success'
  return (
    <button
      type="button"
      disabled={disabled}
      aria-pressed={active}
      onClick={onToggle}
      className={cn(
        'focus-visible:ring-ring inline-flex min-h-9 items-center rounded-md border px-2.5 text-xs font-medium transition-colors duration-150 focus-visible:ring-2 focus-visible:outline-none disabled:opacity-60',
        active
          ? activeTone
          : 'border-border text-muted-foreground hover:bg-accent hover:text-foreground',
      )}
    >
      {option.label}
    </button>
  )
}
