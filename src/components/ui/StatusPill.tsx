import { STATUS_TONE_CLASSES, STATUS_TONE_DOT_CLASSES } from '@/constants/ui'
import { cn } from '@/lib/utils'
import type { StatusPillProps } from '@/types/ui'

/** A compact status label; the one badge shape every screen uses for state. */
export function StatusPill({
  tone,
  children,
  dot = false,
  className,
}: Readonly<StatusPillProps>) {
  return (
    <span
      className={cn(
        'inline-flex h-6 items-center gap-1.5 rounded-md border px-2 text-xs font-medium whitespace-nowrap',
        STATUS_TONE_CLASSES[tone],
        className,
      )}
    >
      {dot ? (
        <span
          aria-hidden
          className={cn(
            'h-1.5 w-1.5 rounded-full',
            STATUS_TONE_DOT_CLASSES[tone],
          )}
        />
      ) : null}
      {children}
    </span>
  )
}
